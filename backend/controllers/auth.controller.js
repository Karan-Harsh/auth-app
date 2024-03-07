import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const newUser = await User.create({
      username: username,
      email,
      password: hashedPassword,
    });
    res.status(201).json("User created successfully");
  } catch (e) {
    next(error);
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const expires = new Date(Date.now() + 3600000);
    res
      .cookie("access-token", token, {
        httpOnly: true,
        age: expires,
      })
      .status(200)
      .json("User logged in");
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something wrong",
    });
  }
};
