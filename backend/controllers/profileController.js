import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
export const getProfile = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  let user = await User.findOne({ username });

  if (!user) {
    user = await User.findById({ username });
    if (!user) {
      return next(new AppError("This user was not found in our system", 404));
    }
  }

  return res.status(200).json(user);
});

export const getReplies = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  let user = await User.findOne({ username });

  if (!user) {
    user = await User.findById({ username });
    if (!user) {
      return next(new AppError("This user was not found in our system", 404));
    }
  }

  return res.status(200).json(user);
});
