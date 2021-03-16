import express from "express";
const router = express.Router();

import {
  followUnFollowUser,
  userFollowers,
  userFollowing,
  getUsers,
} from "../controllers/userController.js";

import protect from "../middlewares/protect.js";

router.get("/", protect, getUsers);
router.put("/:userId/follow", protect, followUnFollowUser);
router.get("/:userId/following", protect, userFollowing);
router.get("/:userId/followers", protect, userFollowers);
export default router;
