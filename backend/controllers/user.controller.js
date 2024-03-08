import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const profile = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jsonwebtoken.verify(token, "secret");
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
    const { token } = req.body;
    const profilePic = req.file.path; // Get the file path from multer
    const decoded = jsonwebtoken.verify(token, "secret");
    const { email } = decoded;
    const user = await User.findOneAndUpdate(
      { email },
      { profilePic },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
