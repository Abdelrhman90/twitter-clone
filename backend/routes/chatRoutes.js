import { Router } from "express";
import {
  createGroupChat,
  getChats,
  getChat,
  changeChatName,
} from "../controllers/chatController.js";
import protect from "../middlewares/protect.js";
const router = Router();

router.post("/", protect, createGroupChat);
router.get("/", protect, getChats);
router.get("/:id", protect, getChat);
router.put("/:id", protect, changeChatName);

export default router;
