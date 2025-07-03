import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();

// Create server and attach socket.io
//hear we are create an instance(copy) of our app server, and passing it into socket.io servev(io).
const server = createServer(app);
const io = connectToSocket(server);

// Set port
app.set("port", process.env.PORT || 8000);

// Middlewares
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb+srv://maheshmja30:PZerUUUnaMFO9Ji6@cluster0.uobg0gx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENIN ON PORT 8000");
  });
};

start();
