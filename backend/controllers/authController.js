import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 500000,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() * 500000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

export const registerUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).select("+password");

  if (user) {
    return next(new AppError("This user already exists", 400));
  }
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, req, res);
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { logUserName, password } = req.body;
  if (!logUserName || !password) {
    return next(new AppError("Please provide a value for each field", 404));
  }
  const user = await User.findOne({
    $or: [{ username: logUserName }, { email: logUserName }],
  }).select("+password");

  if (!user || !(await user.correctPasswords(password, user.password))) {
    return next(
      new AppError("Incorrcet Login Info or password, Please try again", 401)
    );
  }

  createSendToken(user, 200, req, res);
});
