import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://adisornsriphongthong:3FwrPP1jX4sRcZHN@cluster0.rgx9fat.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(res, year) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db('milo')
    const collection = database.collection('years')
    const result = await collection.find({name: year}).toArray()

    res.json(result)
  } catch(err) {
    console.log(err)
  }
}

export { run }
