import React from "react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { toggleUserFollow } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
const User = ({ profile, showFollow, clickHandler }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleFollow = () => {
    dispatch(toggleUserFollow(profile._id));
  };

  return (
    <>
      <div className="user" onClick={clickHandler}>
        <div className="userImageContainer">
          <img src={profile.profilePic} alt="User Image" />
        </div>
        <div className="userDetailsContainer">
          <div className="header">
            <Link to={`/profile/${profile.username}`}>
              {`${profile.firstName} ${profile.lastName}`}
            </Link>
            <span className="username">@{profile.username}</span>
          </div>
        </div>
        {profile._id !== userInfo.user._id && showFollow && (
          <FollowButton
            clickHandler={handleFollow}
            userInfo={userInfo}
            profile={profile}
          />
        )}
      </div>
    </>
  );
};

export default User;
