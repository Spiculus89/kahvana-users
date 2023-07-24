import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import cors from "cors";
import * as dotenv from "dotenv";

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(
    `${process.env.MONGODB_CONNECTION_STRING}`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
