import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowers } from "../redux/actions/profileActions";
import { Col, Row } from "react-bootstrap";
import Tabs from "../components/Tabs";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import "./FollowingScreen.css";
const FollowingScreen = ({ match }) => {
  const username = match.params.userId;
  const { loading, following, followers, profile } = useSelector(
    (state) => state.profile
  );

  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getUserFollowers(username));
  }, [dispatch, username]);

  return (
    <div className="wrapper">
      <Row>
        <Col xs={2}>
          <nav>
            <Sidebar />
          </nav>
        </Col>
        <Col xs={10} md={8} lg={6} className="mainSectionContainer">
          <div className="titleContainer">
            <h1>Following and Followers</h1>
          </div>
          {loading || !profile ? (
            <Loader />
          ) : (
            <Tabs followingComp username={username} profile={profile} />
          )}
        </Col>
        <Col className="d-none d-md-block col-md-2 col-lg-4"></Col>
      </Row>
    </div>
  );
};

export default FollowingScreen;
