import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Chat from "../models/chatSchema.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

export const createGroupChat = asyncHandler(async (req, res, next) => {
  if (!req.body.users) {
    return next(new AppError("You must provide users", "400"));
  }

  let users = JSON.parse(req.body.users);

  if (users.length == 0) {
    return next(new AppError("Users Array is Empty", "400"));
  }
  users.push(req.user.id);
  const chatData = {
    isGroupChat: true,
    users: users,
  };

  const results = await Chat.create(chatData);

  res.status(201).json(results);
});

export const getChats = asyncHandler(async (req, res, next) => {
  let chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user.id } },
  })
    .populate("users")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
  chats = await User.populate(chats, { path: "latestMessage.sender" });

  res.status(200).json(chats);
});

export const getChat = asyncHandler(async (req, res, next) => {
  const chatId = req.params.id;
  const userId = req.user.id;
  const isValid = mongoose.isValidObjectId(chatId);

  if (!isValid) {
    return next(new AppError("Not Valid ID", 404));
  }

  let chat = await Chat.findOne({
    _id: chatId,
    users: { $elemMatch: { $eq: userId } },
  }).populate("users");

  if (!chat) {
    let userFound = await User.findById(chatId);
    if (userFound) {
      chat = await getChatByUserId(userFound._id, userId);
    }
    chat = await getChatByUserId(userFound._id, userId);
  }
  if (!chat) {
    return next(new AppError("No chat exist", 404));
  }
  res.status(200).json(chat);
});

const getChatByUserId = (userId, otherUserId) => {
  return Chat.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2,
        $all: [
          { $elemMatch: { $eq: mongoose.Types.ObjectId(userId) } },
          { $elemMatch: { $eq: mongoose.Types.ObjectId(otherUserId) } },
        ],
      },
    },
    {
      $setOnInsert: {
        users: [userId, otherUserId],
      },
    },
    {
      new: true,
      upsert: true,
    }
  ).populate("users");
};

export const changeChatName = asyncHandler(async (req, res) => {
  const results = await Chat.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json(results);
});
