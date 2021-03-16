import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    pinned: Boolean,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    retweetUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    retweetData: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

const post = mongoose.model("Post", PostSchema);

export default post;
