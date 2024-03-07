import User from "../models/User.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const newUser = await User.create({
      username: name,
      email,
      password: hashedPassword,
    });
    res.status(201).json("User created successfully");
  } catch (e) {
    res.status(500).json(e.message);
  }
};
