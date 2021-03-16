import { Router } from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/messagesController.js";
import protect from "../middlewares/protect.js";
const router = Router();

router.post("/", protect, createMessage);
router.get("/:chatId", protect, getMessages);

export default router;
