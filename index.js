const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w2ynlfu.mongodb.net/?retryWrites=true&w=majority`;

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


        const collegeCollection = client.db("jobDB").collection("college");
        const routecollegeCollection = client.db("jobDB").collection("routeCollege");
        const infoCollection = client.db("jobDB").collection("info");
        const myInfoCollection = client.db("jobDB").collection("info");

        app.get('/college', async(req, res) =>{
            const result = await collegeCollection.find().toArray();
            res.send(result)
        })
        app.get('/info', async(req, res) =>{
            const result = await myInfoCollection.find().toArray();
            res.send(result)
        })
        app.get('/routeCollege', async(req, res) =>{
            const result = await routecollegeCollection.find().toArray();
            res.send(result)
        })

        app.post('/info', async (req, res) => {
            const items = req.body;
            const result = await infoCollection.insertOne(items);
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('job task is running')
})

app.listen(port, () => {
    console.log(`job task is running on port ${port}`)
})