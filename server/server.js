
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
    app.get('/api/test', async (req, res) => {
        let collection = await client.db("sample_mflix").collection("comments");
        let results = await collection.find({})
            .limit(1);
        res.send(results).status(200);
    });

    app.get('/api/boards/board', async (req, res) => {
      let collection = await client.db("kanban").collection("boards");
      let query = { _id: new ObjectId(req.query._id) };
      let results = await collection.find(query)
        .limit(1)
        .toArray();
      res.send(results).status(200);
    });

    app.post('/api/boards/board/title', async (req, res) => {
      let collection = await client.db("kanban").collection("boards");
      let query = { id: new ObjectId(req.query._id)};
    });
    
    app.listen(PORT, 'localhost', (error) =>{ 
        if(!error) 
            console.log(`Server is Successfully Running, and App is listening on port ${PORT}`); 
        else 
            console.log("Error occurred, server can't start", error); 
        } 
    ); 
  }
}
run().catch(console.dir);