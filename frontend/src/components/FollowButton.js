import React from "react";

const FollowButton = ({ userInfo, profile, clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className={
        userInfo.user.following.includes(profile._id)
          ? "followButton following"
          : "followButton"
      }
    >
      {userInfo.user.following.includes(profile._id) ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
