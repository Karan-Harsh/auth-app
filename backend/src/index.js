import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../routes/user.routes.js";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Databse");
  })
  .catch((err) => console.log(err));

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log("Server started on Port 3000"));
