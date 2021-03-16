import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  getUserFollowers,
  getUserFollowing,
} from "../redux/actions/profileActions";
import { toggleSearchMode } from "../redux/actions/postActions";
import Loader from "./Loader";
import Post from "./Post";
import User from "./User";

const Tabs = ({ followingComp, username, profile, search, userProfile }) => {
  const dispatch = useDispatch();
  const tabState = followingComp ? "followers" : "posts";
  const { loadingFollowing } = useSelector((state) => state.profile);
  const { mode } = useSelector((state) => state.searchMode);

  const [activeTab, setActiveTab] = useState(tabState);

  const { posts, replies, pinnedPost } = useSelector((state) => state.post);

  const handleFollowerClick = async () => {
    dispatch(getUserFollowers(username));
    setActiveTab("followers");
  };

  const handleFollowingClick = async () => {
    dispatch(getUserFollowing(username));
    setActiveTab("following");
  };

  return (
    <>
      <div className="tabsContainer">
        {followingComp ? (
          <>
            <div
              onClick={handleFollowerClick}
              className={activeTab == "followers" ? "tab active" : "tab"}
            >
              Followers
            </div>
            <div
              onClick={handleFollowingClick}
              className={activeTab == "following" ? "tab active" : "tab"}
            >
              Following
            </div>
          </>
        ) : search ? (
          <>
            <div
              onClick={() => dispatch(toggleSearchMode())}
              className={mode == "postsMode" ? "tab active" : "tab"}
            >
              Posts
            </div>
            <div
              onClick={() => dispatch(toggleSearchMode())}
              className={mode == "usersMode" ? "tab active" : "tab"}
            >
              Users
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => setActiveTab("posts")}
              className={activeTab == "posts" ? "tab active" : "tab"}
            >
              Posts
            </div>
            <div
              onClick={() => setActiveTab("replies")}
              className={activeTab == "replies" ? "tab active" : "tab"}
            >
              Replies
            </div>
          </>
        )}
      </div>
      {followingComp ? (
        <div className="followingContainer">
          {loadingFollowing ? (
            <Loader />
          ) : activeTab === "followers" ? (
            profile.followers.map((profile) => (
              <User key={profile._id} profile={profile} />
            ))
          ) : loadingFollowing ? (
            <Loader />
          ) : (
            activeTab === "following" &&
            profile.following.map((profile) => (
              <User key={profile._id} profile={profile} showFollow />
            ))
          )}
        </div>
      ) : (
        <>
          {pinnedPost.length === 0
            ? null
            : activeTab === "posts" && (
                <div className="pinnedPostContainer">
                  {pinnedPost.map((post) => (
                    <Post key={post._id} post={post} pinned />
                  ))}
                </div>
              )}
          {userProfile && (
            <div className="postsContainer">
              {activeTab === "posts" &&
                mode !== null &&
                posts.map((post) => <Post key={post._id} post={post} />)}
              {activeTab === "replies" &&
                replies.map((post) => <Post key={post._id} post={post} />)}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Tabs;
