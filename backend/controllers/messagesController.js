import asyncHandler from "express-async-handler";
import Chat from "../models/chatSchema.js";
import Message from "../models/messageModel.js";

export const createMessage = asyncHandler(async (req, res) => {
  const newMessage = {
    content: req.body.content,
    sender: req.user.id,
    chat: req.body.chatId,
  };

  let message = await Message.create(newMessage);
  message = await message.populate("sender").execPopulate();
  message = await message.populate("chat").execPopulate();

  await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

  res.status(201).json(message);
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ chat: req.params.chatId }).populate(
    "sender"
  );

  res.status(200).json(messages);
});
