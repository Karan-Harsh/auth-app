import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const profile = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const profilePicUpdate = async (req, res) => {
  try {
    const { token, imageUrl } = req.body;
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const user = await User.findOneAndUpdate(
      { email },
      { profilePicture: imageUrl }, // Store the profile picture URL in the database
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile picture:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
