import { MongoClient } from "mongodb";

const express = require("express");
const body = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

async function start() {
  try {
    const app = express();

    const mongo_username = process.env.MONGO_USERNAME;
    const mongo_password = process.env.MONGO_PASSWORD;
    const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.vsn4mkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/`;

    const client = new MongoClient(uri);

    const mongo = await MongoClient.connect(uri);

    app.use(cors());

    await mongo.connect();

    app.db = mongo.db("market");

    //Routes

    app.use(express.json());

    app.use("/api/v1/categories", require("./routes/categories"));

    //Start server

    app.listen(5000, () => {
      console.log("server is running on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
