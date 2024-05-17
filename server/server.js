
//gets our environment variables from the .env file
require('dotenv').config();

const PORT = process.env.PORT;

const uri = process.env.DB_CONNECT_URI;

const express = require('express');
const { MongoClient, ObjectId, ServerApiVersion  } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt
const { generateToken, authenticateToken, getUserIdFromToken } = require('./auth');
const app = express();

app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("kanban").command({ ping: 1 });
    
  } finally {
    console.log("Connected successfully to DB...");

    // Route to create a new user
    app.post('/api/users/create', async (req, res) => {
      const { username, email, password } = req.query;
      console.log(req.query.username);
      const db = client.db('kanban');
      const usersCollection = db.collection('users');

      const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      try {
        // Hash the password and email before storing them
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const hashedEmail = await bcrypt.hash(email, saltRounds);

        await usersCollection.insertOne({
          username: username,
          email: hashedEmail,
          password: hashedPassword,
          boards: [],
          settings: {
            theme: 'dark',
            language: 'en-us',
            timezone: '',
            pfp: 'default.png'
          },
          role: 'user',
          activated: true
        });

        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        console.error(`Error creating user: ${err}`)
        res.status(500).json({ error: 'Error creating user' });
      }
    });

    // Route to log a user in and set JWT session
    app.post('/api/users/login', async (req, res) => {
      const { username, password } = req.query;
      const db = client.db('kanban');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'No user with that username' });
      }

      try {
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token });
        console.log(token);
      } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
        console.error(err);
      }
    });

    // Route to return user info except password and email if logged in
    app.get('/api/users/me', authenticateToken, async (req, res) => {
      const userId = req.user.userId;
      const db = client.db('kanban');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ _id: ObjectId(userId) }, { projection: { password: 0, email: 0 } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    });

    // Route to return user's email if logged in
    app.get('/api/users/email', authenticateToken, async (req, res) => {
      const userId = req.user.userId;
      const db = client.db('kanban');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ _id: ObjectId(userId) }, { projection: { email: 1, _id: 0 } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ email: user.email });
    });

    // Route to add a new board to the logged-in user's boards
    app.post('/api/boards', authenticateToken, async (req, res) => {
      const userId = req.user.userId;
      const { title } = req.body;
      const db = client.db('kanban');
      const usersCollection = db.collection('users');

      const newBoard = {
        _id: new ObjectId(),
        title,
        stickyNotes: [],
      };

      const result = await usersCollection.updateOne({ _id: ObjectId(userId) }, { $push: { boards: newBoard } });
      if (result.modifiedCount !== 1) {
        return res.status(404).json({ error: 'User not found or board not added' });
      }

      res.status(201).json({ message: 'Board added successfully' });
    });

    // Route to add notes to a specified board (by _id)
    app.post('/api/boards/:boardId/notes', authenticateToken, async (req, res) => {
      const { text } = req.body;
      const boardId = req.params.boardId;
      const db = client.db('kanban');
      const usersCollection = db.collection('users');

      const result = await usersCollection.updateOne(
        { _id: ObjectId(boardId) },
        { $push: { 'boards.$.stickyNotes': { text } } }
      );
      if (result.modifiedCount !== 1) {
        return res.status(404).json({ error: 'Board not found or note not added' });
      }

      res.status(201).json({ message: 'Note added successfully' });
    });

    app.listen(PORT, 'localhost', (error) =>{ 
      if(!error) 
          console.log(`Server is listening on port ${PORT}`); 
      else 
          console.log("Error occurred, server can't start", error); 
      } 
  ); 
  }
}
run().catch(console.dir);