import { Router } from "express";
import {
  createPost,
  getAllPosts,
  addRemoveLikes,
  addRemoveRetweets,
  getOnePost,
  deletePost,
  pinUnpinPosts,
} from "../controllers/postController.js";
import protect from "../middlewares/protect.js";
const router = Router();

router.get("/", protect, getAllPosts);
router.get("/:id", protect, getOnePost);
router.post("/", protect, createPost);
router.delete("/:id", protect, deletePost);
router.put("/:id", protect, pinUnpinPosts);

router.put("/:id/like", protect, addRemoveLikes);
router.post("/:id/retweet", protect, addRemoveRetweets);

export default router;
