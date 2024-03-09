import express from "express";
import { profile, profilePicUpdate } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/profile", profile);
router.post("/profile/picture", profilePicUpdate);

export default router;
