import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";

export const getUsers = asyncHandler(async (req, res) => {
  let searchObj = req.query;

  if (req.query.search) {
    searchObj = {
      $or: [
        { firstName: { $regex: req.query.search, $options: "i" } },
        { lastName: { $regex: req.query.search, $options: "i" } },
        { username: { $regex: req.query.search, $options: "i" } },
      ],
    };
  }

  const users = await User.find(searchObj);

  res.status(200).json(users);
});

export const followUnFollowUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  if (!user) return next(new AppError("This user was not found", 404));

  const isFollowing = user.followers && user.followers.includes(req.user.id);
  const options = isFollowing ? "$pull" : "$addToSet";
  req.user = await User.findByIdAndUpdate(
    req.user.id,
    { [options]: { following: userId } },
    { new: true }
  );

  await User.findByIdAndUpdate(userId, {
    [options]: { followers: req.user.id },
  });
  res.status(200).json(req.user);
});

export const userFollowers = asyncHandler(async (req, res, next) => {
  const username = req.params.userId;
  const user = await User.findOne({ username }).populate("followers");

  res.status(200).json(user);
});
export const userFollowing = asyncHandler(async (req, res, next) => {
  const username = req.params.userId;

  const user = await User.findOne({ username }).populate("following");

  res.status(200).json(user);
});
