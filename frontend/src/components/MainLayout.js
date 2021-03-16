import React, { useEffect } from "react";
import "./MainLayout.css";
import PostForm from "./PostForm";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { listPosts } from "../redux/actions/postActions";
import Loader from "./Loader";
const MainLayout = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  return (
    <>
      <div className="titleContainer">
        <h1>Home</h1>
      </div>
      <PostForm />
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </>
  );
};

export default MainLayout;
