import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/actions/postActions";
import FormContainer from "./Form";

const PostForm = () => {
  const dispatch = useDispatch();
  const [textArea, setTextArea] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  const handlePostSubmit = (e) => {
    dispatch(createPost(textArea));
    setTextArea("");
  };

  return (
    <>
      <FormContainer
        value={textArea}
        changeHandler={(e) => setTextArea(e.target.value)}
        userImage={userInfo.user.profilePic}
        placeholder="What's happening"
        handlePostSubmit={handlePostSubmit}
        postBox
      />
    </>
  );
};

export default PostForm;
