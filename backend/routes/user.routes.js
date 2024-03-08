import express from "express";
import { profile, profilePicUpdate } from "../controllers/user.controller.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/profile", profile);
router.post(
  "/profile/picture",
  upload.single("profilePicture"),
  profilePicUpdate
);

export default router;
