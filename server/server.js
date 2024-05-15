
const express = require('express'); 
  
const app = express(); 
const PORT = 3001; 



const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const uri = `mongodb+srv://admin:${PASSWORD}@kanban.wr0m9gy.mongodb.net/?retryWrites=true&w=majority&appName=kanban`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    await client.db("sample_mflix").command({ ping: 1 });
    
  } finally {
    //get a single board by id
    app.get('/api/boards/board', async (req, res) => {
      let boards = await client.db("kanban").collection("boards");
      let query = { _id: new ObjectId(req.query._id) };
      let results = await boards.find(query)
        .limit(1)
        .toArray();
      res.send(results).status(200);
    });

    //get all boards that belong to a user
    app.get('/api/user/boards', async (req, res) => {
      let users = await client.db("kanban").collection("users");
      let query = {_id: new ObjectId(req.query._id)};
      let results = await users.find(query)
        .limit(1)
        .toArray();

      res.send(results[0].boards).status(200);
    });

    //update the board title
    app.post('/api/boards/board/title', async (req, res) => {
      let collection = await client.db("kanban").collection("boards");
      let query = { _id: new ObjectId(req.query._id)};
      let updates = {
        $set: { title: req.query.title }
      };
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    });

    //add a note
    app.post('/api/boards/board/addnote', async (req, res) => {
      let collection = await client.db("kanban").collection("boards");
      let query = { _id: new ObjectId(req.query._id)};
      let updates = {
        $push: { 
          stickyNote: {
            color: req.query.color,
            front: req.query.front,
            back: req.query.back,
            width: req.query.width,
            height: req.query.height,
            top: req.query.top,
            left: req.query.left
          } 
        }
      };
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
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