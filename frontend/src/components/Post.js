import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { timeDifference } from "../utils/timeDifference";
import { useDispatch, useSelector } from "react-redux";
import { RiPushpin2Fill } from "react-icons/ri";

import {
  togglePostLike,
  togglePostRetweet,
} from "../redux/actions/postActions";
import Modal from "./Modal";
import "./MainLayout.css";

const Post = ({ post, main, pinned }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const postTime = timeDifference(new Date(), new Date(post.createdAt));
  const userId = userInfo.user._id;
  const retweetedBy = post.retweetData ? post.postedBy.username : null;
  const isRetweet = post.retweetData;
  const isReply =
    post.replyTo && post.replyTo._id ? post.replyTo.postedBy.username : null;
  const mainText = main ? "big" : "";
  const { profilePic, firstName, lastName, username, _id } = post.postedBy;
  const displayName = `${firstName} ${lastName}`;
  const retweetButtonClass =
    (isRetweet && post.retweetData.retweetUsers.includes(userId)) ||
    post.retweetUsers.includes(userId)
      ? "green"
      : "";
  const handleRetweet = (e) => {
    e.preventDefault();
    dispatch(togglePostRetweet(post._id));
  };

  const likeHandler = (e) => {
    e.preventDefault();
    dispatch(togglePostLike(post._id));
  };

  return (
    <Link to={`/posts/${post._id}`} className="post">
      <div className="postActionContainer">
        {retweetedBy && (
          <span>
            <FaRetweet /> Retweeted By
            <Link to={`/profile/${retweetedBy}`}> @{retweetedBy}</Link>
          </span>
        )}
        {isReply && (
          <span>
            Replying To
            <Link to={`/profile/${isReply}`}> @{isReply}</Link>
          </span>
        )}
        {pinned && (
          <span>
            <RiPushpin2Fill /> Pinned Post
          </span>
        )}
      </div>
      <div className="mainPostContainer">
        <div className="userImageContainer">
          <img src={profilePic} alt="User Profile" />
        </div>
        <div className="postContentContainer">
          <div className="header">
            <Link to={`/profile/${username}`} className="displayname">
              {displayName}
            </Link>
            <span className="username">@{username}</span>
            <span className="date">{postTime}</span>
            {_id === userId ? (
              <>
                <span onClick={(e) => e.preventDefault()}>
                  <Modal post={post} pin />
                </span>
                <span onClick={(e) => e.preventDefault()}>
                  <Modal post={post} times />
                </span>
              </>
            ) : null}
          </div>
          <div className="body">
            <span className={mainText}>
              {post.retweetData ? post.retweetData.content : post.content}
            </span>
          </div>
          <div className="footer">
            <div
              className="postButtonContainer"
              onClick={(e) => e.preventDefault()}
            >
              <Modal post={post} />
            </div>
            <div className="postButtonContainer" onClick={handleRetweet}>
              <button className={retweetButtonClass}>
                <FaRetweet />
                <span>
                  {isRetweet
                    ? isRetweet.retweetUsers.length
                    : post.retweetUsers.length || ""}
                </span>
              </button>
            </div>
            <div className="postButtonContainer" onClick={likeHandler}>
              <button className={post.likes.includes(userId) ? "red" : ""}>
                <AiOutlineHeart />

                <span>{post.likes.length || ""}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
