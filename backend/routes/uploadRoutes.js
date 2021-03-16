import express from "express";
import path from "path";
import multer from "multer";
import User from "../models/userModel.js";
import protect from "../middlewares/protect.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/images");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.png`);
  },
});

const upload = multer({ storage });

router.post(
  "/profilePicture",
  upload.single("croppedImage"),
  protect,
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400);
    }
    const filePath = `/api/uploads/images/${req.file.filename}`;

    req.user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: filePath },
      { new: true }
    );

    res.status(200).send(`/api/uploads/images/${req.file.filename}`);
  }
);

router.post(
  "/coverPicture",
  upload.single("croppedImage"),
  protect,
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400);
    }
    const filePath = `/api/uploads/images/${req.file.filename}`;

    req.user = await User.findByIdAndUpdate(
      req.user.id,
      { coverPic: filePath },
      { new: true }
    );

    res.status(200).send(`/api/uploads/images/${req.file.filename}`);
  }
);

router.get("/images/:path", (req, res) => {
  res.sendFile(path.join(path.resolve(), `/uploads/images/${req.params.path}`));
});

export default router;
