import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../routes/user.routes.js";
import authRoutes from "../routes/auth.route.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log("Connected to Databse");
//   })
//   .catch((err) => console.log(err));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log("Server started on Port 3000"));
