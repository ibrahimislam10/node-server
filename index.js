

const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');
const uri = "mongodb+srv://ibrahim:IOuq9YwKRr4gPbtV@cluster0.pte2d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        await client.connect();
        const userCollection = client.db('ibrahimDB').collection('services');

        app.get('/services',  async(req, res) => {
            const query ={};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray(cursor);
            res.send(result)
        })

    } finally {

        //   await client.close();

    }

}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('hello world')
});

app.listen(port, () => {
    console.log(`server is sucess `)
})