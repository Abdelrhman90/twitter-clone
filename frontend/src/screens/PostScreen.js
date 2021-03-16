import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../redux/actions/postActions";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { GET_POST_RESET } from "../redux/types";
const PostScreen = ({ match }) => {
  const postId = match.params.id;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { post, loading, replies, replyTo } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getPost(postId));

    dispatch({ type: GET_POST_RESET });
  }, [dispatch, postId]);

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
              <h1>View post</h1>
            </div>
            {loading || !post ? (
              <Loader />
            ) : (
              <div className="content">
                {replyTo && <Post post={replyTo} />}
                {<Post post={post} main />}
                {replies.length !== 0 &&
                  replies.map((reply) => <Post key={reply._id} post={reply} />)}
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

export default PostScreen;
