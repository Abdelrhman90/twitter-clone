import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const getPosts = asyncHandler(async (filter) => {
  let posts = await Post.find(filter)
    .populate("postedBy", "id firstName lastName username profilePic")
    .populate("replyTo")
    .populate("retweetData")
    .sort("-createdAt");

  posts = await User.populate(posts, { path: "retweetData.postedBy" });
  return await User.populate(posts, { path: "replyTo.postedBy" });
});

export const getAllPosts = asyncHandler(async (req, res) => {
  let searchObj = req.query;

  if (searchObj.isReply) {
    let isReply = searchObj.isReply == "true";
    searchObj.replyTo = { $exists: isReply };
    delete searchObj.isReply;
  }

  if (searchObj.search) {
    searchObj.content = { $regex: searchObj.search, $options: "i" };
    delete searchObj.search;
  }

  if (searchObj.followingOnly) {
    let followingOnly = searchObj.followingOnly == "true";
    if (followingOnly) {
      let objectIds = [];
      if (!req.user.following) {
        req.user.following = [];
      }

      req.user.following.forEach((object) => {
        objectIds.push(object);
      });

      objectIds.push(req.user.id);
      searchObj.postedBy = { $in: objectIds };
    }
    delete searchObj.followingOnly;
  }

  const results = await getPosts(searchObj);

  return res.status(200).json(results);
});

export const getOnePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  let postData = await getPosts({ _id: postId });
  postData = postData[0];
  let results = {
    postData,
  };

  if (postData.replyTo) {
    results.replyTo = postData.replyTo;
  }

  results.replies = await getPosts({ replyTo: postId });
  return res.status(200).json(results);
});

export const createPost = asyncHandler(async (req, res) => {
  const postData = {
    content: req.body.content,
    postedBy: req.user.id,
  };

  if (req.body.replyTo) {
    postData.replyTo = req.body.replyTo;
  }

  const newPost = await Post.create(postData);
  const popPost = await User.populate(newPost, { path: "postedBy" });

  res.status(201).json(popPost);
});

export const addRemoveLikes = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const isLiked = req.user.likes && req.user.likes.includes(postId);

  const options = isLiked ? "$pull" : "$addToSet";

  req.user = await User.findByIdAndUpdate(
    userId,
    { [options]: { likes: postId } },
    { new: true }
  );

  const post = await Post.findByIdAndUpdate(
    postId,
    { [options]: { likes: userId } },
    { new: true }
  );

  res.status(200).json(post);
});

export const addRemoveRetweets = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const deletedPost = await Post.findOneAndDelete({
    postedBy: userId,
    retweetData: postId,
  });

  const options = deletedPost !== null ? "$pull" : "$addToSet";

  let repost = deletedPost;

  if (repost === null) {
    repost = await Post.create({ postedBy: userId, retweetData: postId });
  }

  // insert retweet to user
  req.user = await User.findByIdAndUpdate(
    userId,
    { [options]: { retweets: repost._id } },
    { new: true }
  );

  // insert retweet to post
  const post = await Post.findByIdAndUpdate(
    postId,
    { [options]: { retweetUsers: userId } },
    { new: true }
  );

  res.status(200).json(post);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(202).json("Deleted");
});

export const pinUnpinPosts = asyncHandler(async (req, res) => {
  if (req.body.pinned === true) {
    await Post.updateMany({ postedBy: req.user.id }, { pinned: false });
  }

  await Post.findByIdAndUpdate(req.params.id, req.body);
  res.sendStatus(204);
});
