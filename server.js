// importing
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import Pusher from "pusher";

import connectDB from "./db/connect.js";
import whatsAppRouter from "./routes/routes.js";

// app config
const app = express();

// Pusher
const pusher = new Pusher({
  appId: "1768158",
  key: "6275b4b6c7f230697a54",
  secret: "a20abcc58e6eaceaa7ce",
  cluster: "eu",
  useTLS: true,
});

// middleware
app.use(express.json());
app.use(cors());

// // Security
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Headers", "*")

//   next();
// })

// api routes
app.use("/api/v1/", whatsAppRouter);

// DB Config
const port = process.env.PORT || 6000;

const db = mongoose.connection;

db.once("open", () => {
  // console.log("DB connected")
  const msgCollection = db.collection("messagedatas");
  // console.log("===>", msgCollection)

  const changeStream = msgCollection.watch();
  // console.log("===>", changeStream)

  changeStream.on("change", (change) => {
    // console.log("Change occured===>", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      // console.log(">>>>>", messageDetails)

      // Check pusher.com for more info about pusher
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGO_URL);
    console.log("CONNECTED TO THE DB...");

    // Listening to Host
    app.listen(port, () =>
      console.log(`Listening to server on port: ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
