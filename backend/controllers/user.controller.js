import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { profilePicUpdateSchema, tokenSchema } from "../models/User.js";

const primsa = new PrismaClient();
dotenv.config();

export const profile = async (req, res, next) => {
  const validInput = tokenSchema.safeParse(req.body);
  if (validInput.success) {
    try {
      const { token } = req.body;
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;
      const user = await primsa.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    next(errorHandler(400, "Invalid token"));
  }
};

export const profilePicUpdate = async (req, res, next) => {
  const validInput = profilePicUpdateSchema.safeParse(req.body);
  if (validInput.success) {
    try {
      const { token, imageUrl } = req.body;
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;
      const user = await primsa.user.update({
        where: {
          email: email,
        },
        data: {
          profilePicture: imageUrl,
        },
      });

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
  } else {
    next(errorHandler(400, "Invalid token"));
  }
};
