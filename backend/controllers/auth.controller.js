import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(password);
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = await User.create({
      username: username,
      email,
      password: hashedPassword,
      profilePicture:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        token: token,
      });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
