import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Col, Row } from "react-bootstrap";
import Tabs from "../components/Tabs";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../redux/actions/postActions";
import { getUsers } from "../redux/actions/userActions";
import { GET_POSTS_RESET } from "../redux/types";
import Post from "../components/Post";
import User from "../components/User";
import "./ProfileScreen.css";
import Loader from "../components/Loader";
const SearchScreen = () => {
  const { mode } = useSelector((state) => state.searchMode);
  const { users, loading } = useSelector((state) => state.searchUsers);
  const { posts } = useSelector((state) => state.post);

  let timer;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    clearTimeout(timer);
    let value = e.target.value;

    timer = setTimeout(() => {
      value = e.target.value.trim();
      if (value == "") {
        return;
      } else {
        if (mode === "postsMode") {
          dispatch(listPosts(value));
        } else {
          dispatch(getUsers(value));
        }
      }
    }, 1000);
  };

  useEffect(() => {
    dispatch({ type: GET_POSTS_RESET });
  }, [dispatch]);

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
              <h1>Search</h1>
            </div>
            <div className="searchBarContainer">
              <FaSearch />
              <input type="text" name="searchBox" onKeyDown={handleChange} />
            </div>
            <Tabs search />
            <div className="resultsContainer followingContainer">
              {mode === "postsMode" &&
                posts.map((post) => <Post key={post._id} post={post} />)}
              {!users ||
                (mode === "usersMode" &&
                  users.map((profile) => (
                    <User key={profile._id} profile={profile} />
                  )))}
            </div>
          </Col>
          <Col className="d-none d-md-block col-md-2 col-lg-4"></Col>
        </Row>
      </div>
      )
    </>
  );
};

export default SearchScreen;
