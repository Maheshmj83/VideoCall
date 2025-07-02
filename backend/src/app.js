import express from "express";
const app = express();
import { createServer } from "http";
import cors from "cors";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import usersRouter from "./routes/usersRoutes.js";

// Create server and attach socket.io
//hear we are create an instance(copy) of our app server, and passing it into socket.io servev(io).
const server = createServer(app);
const io = connectToSocket(server);

// Set port
app.set("port", process.env.PORT || 8000);

// Middlewares
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

// Test route
app.get("/home", (req, res) => {
  res.json({ name: "mahesh jadhav" });
});

// Routes
app.use("/api/v1/", usersRouter);

// const mongoAtl =
//   "mongodb+srv://maheshmja30:PZerUUUnaMFO9Ji6@cluster0.uobg0gx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Start server and connect DB
const start = async () => {
  try {
    const connectionDb = await mongoose.connect(
      "mongodb+srv://maheshmja30:PZerUUUnaMFO9Ji6@cluster0.uobg0gx.mongodb.net/"
    );
    console.log(`✅ MongoDB connected: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`🚀 Server is listening on port ${app.get("port")}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

start();
