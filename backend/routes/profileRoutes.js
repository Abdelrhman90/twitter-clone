import express from "express";
import protect from "../middlewares/protect.js";
import { getProfile, getReplies } from "../controllers/profileController.js";
const router = express.Router();

router.get("/:username", protect, getProfile);
router.get("/:username/replies", protect, getReplies);

export default router;
