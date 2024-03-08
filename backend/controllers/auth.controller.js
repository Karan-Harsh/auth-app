import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import fs from "fs";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    // Read the default profile picture
    const imgPath = "/home/karan/work/projects/auth-app/backend/models/d1.jpg"; // Change this to the correct path
    const imgData = fs.readFileSync(imgPath);

    const newUser = await User.create({
      username: username,
      email,
      password: hashedPassword,
      profilePicture: {
        data: imgData,
        contentType: "image/jpeg", // Adjust content type accordingly
      },
    });
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next(errorHandler(404, "User not found"));
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      next(errorHandler(401, "Wrong credentials"));
    }
    const value = {
      email,
      password,
    };
    const token = jwt.sign(value, "secret");
    res
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        token: token,
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something wrong",
    });
  }
};
