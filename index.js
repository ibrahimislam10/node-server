
const { MongoClient, ServerApiVersion, } = require('mongodb');
const express = require('express');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json())




const res = require('express/lib/response');
const uri = "mongodb+srv://ibrahim:IOuq9YwKRr4gPbtV@cluster0.pte2d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        await client.connect();
        const userCollection = client.db('ibrahimDB').collection('services');

        // get item method 
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray(cursor);
            res.send(result)
        });

        // get id method
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query)
            res.send(result)
        });
        

        //delete method
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query)
            res.send(result)
        });


        //delete put method
        app.put('/services/:id', async (req, res) => {
            const id = req.params.id;
            const UPtateuser = req.body;
            const filter = { _id: ObjectId(id) };
            const option = { upset: true }
            const Upsatedoc = {
                $set: {
                    stock: UPtateuser.stock,
                }
            }
            const result = await userCollection.updateOne(filter, Upsatedoc, option);
            res.send(result)
        });

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