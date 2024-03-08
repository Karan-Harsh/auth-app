import jsonwebtoken, { decode } from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const profile = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jsonwebtoken.verify(token, "secret");
    console.log(decoded);
    const { email } = decoded;
    console.log(email);
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json("Internal server error");
  }
};
