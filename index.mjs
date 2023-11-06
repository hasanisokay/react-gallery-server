import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-hzckllx-shard-00-00.wvig2d6.mongodb.net:27017,ac-hzckllx-shard-00-01.wvig2d6.mongodb.net:27017,ac-hzckllx-shard-00-02.wvig2d6.mongodb.net:27017/?ssl=true&replicaSet=atlas-sxh7jl-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const iamgeLinkCollection = client
      .db("react-gallery")
      .collection("linkCollection");
    app.post("/newLink", async(req, res) => {
        const newLink = req.body;
        const result = await iamgeLinkCollection.insertOne(newLink)
        res.send(result);
        console.log(result);
    });
    app.get("/allLink", async(req,res)=>{
        const result = await iamgeLinkCollection.find().sort({isFeatured:-1}).toArray();
        res.send(result);
    })
    app.post("/updateFeature", async(req,res)=>{
      const url = req.body;
      console.log(url);
    })
  } catch {}
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("React Gallery server is running.");
});

app.listen(port, () => {
  console.log(`React gallery is running on ${port} port`);
});
