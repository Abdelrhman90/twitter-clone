import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/profileActions";
import { GET_PROFILE_RESET } from "../redux/types";
import {
  listUserPosts,
  listUserReplies,
  listUserPinnedPost,
} from "../redux/actions/postActions";
import { toggleUserFollow } from "../redux/actions/userActions";
import Loader from "../components/Loader";
import Tabs from "../components/Tabs";
import FollowButton from "../components/FollowButton";
import ImageUploadModal from "../components/ImageUploadModal";
import "./ProfileScreen.css";
const ProfileScreen = ({ match }) => {
  const dispatch = useDispatch();

  const username = match.params.username;
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, profile, errors } = useSelector((state) => state.profile);

  useEffect(async () => {
    dispatch({ type: GET_PROFILE_RESET });
    if (!username) {
      await dispatch(getUserProfile(userInfo.user.username));
    } else {
      await dispatch(getUserProfile(username));
    }

    dispatch(listUserPosts());
    dispatch(listUserPinnedPost());
    dispatch(listUserReplies());
  }, [dispatch, username]);

  const handleFollow = () => {
    dispatch(toggleUserFollow(profile._id));
  };

  return (
    <>
      <div className="wrapper">
        <Row>
          <Col xs={2}>
            <nav>
              <Sidebar />
            </nav>
          </Col>
          <Col xs={10} md={8} lg={6} className="mainSectionContainer">
            <div className="titleContainer">
              <h1>User Profile Page</h1>
            </div>
            {loading || !profile ? (
              <Loader />
            ) : (
              <div className="profileHeaderContainer">
                <div className="coverPhotoSection">
                  <div className="coverPhotoContainer">
                    {profile.coverPic && <img src={profile.coverPic} />}
                    {profile._id === userInfo.user._id && (
                      <ImageUploadModal cover />
                    )}
                  </div>
                  <div className="profileImageContainer">
                    <img
                      src={profile.profilePic}
                      alt="User's Profile Picture"
                    />
                    {profile._id === userInfo.user._id && <ImageUploadModal />}
                  </div>
                </div>

                <div className="profileButtonsContainer">
                  {profile._id !== userInfo.user._id ? (
                    <>
                      <Link
                        to={`/messages/${profile._id}`}
                        className="profileButton"
                      >
                        <FaEnvelope />
                      </Link>
                      {/* Follow Button */}
                      <FollowButton
                        userInfo={userInfo}
                        profile={profile}
                        clickHandler={handleFollow}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="userDetailsContainer">
                  <span className="displayName">
                    {profile.firstName} {profile.lastName}
                  </span>
                  <span className="username">@{profile.username}</span>
                  <span className="description">{profile.description}</span>
                  <div className="followersContainer">
                    <Link to={`/profile/${profile.username}/following`}>
                      <span className="value">{profile.following.length}</span>
                      <span> Following</span>
                    </Link>
                    <Link to={`/profile/${profile.username}/followers`}>
                      <span className="value">{profile.followers.length}</span>
                      <span> Followers</span>
                    </Link>
                  </div>
                </div>
                <Tabs userProfile />
              </div>
            )}
          </Col>
          <Col className="d-none d-md-block col-md-2 col-lg-4"></Col>
        </Row>
      </div>
      )
    </>
  );
};

export default ProfileScreen;
