import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "./Form";
import Post from "./Post";
import { FaTimes } from "react-icons/fa";
import {
  getPost,
  createPost,
  deletePost,
  pinPost,
  unpinPost,
} from "../redux/actions/postActions";
import { updateChatName } from "../redux/actions/chatActions";
const ReplyModal = ({ post, times, pin, inbox, chatName }) => {
  const { chat } = useSelector((state) => state.chats);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const {
    userInfo: { user },
  } = useSelector((state) => state.userLogin);

  const handleCommentClick = async (e) => {
    await dispatch(getPost(post._id));
    setShow(true);
  };
  const handleComment = (e) => {
    dispatch(createPost(text, post._id));
    setShow(false);
    window.location.reload();
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    setShow(false);
  };

  const handlePin = () => {
    if (post.pinned === true) {
      dispatch(unpinPost(post._id));
    } else {
      dispatch(pinPost(post._id));
    }
    setShow(false);
    window.location.reload();
  };
  const handleNameChange = () => {
    dispatch(updateChatName(chat._id, text));
    setShow(false);
    window.location.reload();
  };

  const handleShowModal = () => {
    setShow(true);
  };
  const handleClose = (e) => {
    setShow(false);
  };

  return (
    <>
      {times ? (
        <FaTimes onClick={handleShowModal} />
      ) : pin ? (
        post.pinned === true ? (
          <RiPushpin2Fill onClick={handleShowModal} />
        ) : (
          <RiPushpin2Line onClick={handleShowModal} />
        )
      ) : inbox ? (
        <span className="chatName" onClick={handleShowModal}>
          {chatName}
        </span>
      ) : (
        <div className="postButtonContainer">
          <button onClick={handleCommentClick}>
            <FaRegComment />
          </button>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {times
              ? "Delete Post"
              : pin
              ? post.pinned === true
                ? "UnPin Post"
                : "Pin Post"
              : inbox
              ? "Change the name of the chat"
              : "Leave a reply"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {times ? (
            <p>Are you sure yout want to delete this post?</p>
          ) : pin ? (
            post.pinned === true ? (
              <p>Are you sure yout want to unpin this post?</p>
            ) : (
              <p>Are you sure yout want to pin this post?</p>
            )
          ) : inbox ? (
            <input
              type="text"
              placeholder="Enter the new name for the chat"
              className="chatNameTextBox"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <>
              <Post key={post._id} post={post} />
              <FormContainer
                value={text}
                changeHandler={(e) => {
                  e.preventDefault();
                  setText(e.target.value);
                }}
                userImage={user.profilePic}
                placeholder="Leave a Reply"
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {times ? (
            <Button variant="primary" onClick={handleDelete}>
              Delete
            </Button>
          ) : pin ? (
            <Button variant="primary" onClick={handlePin}>
              {post.pinned === true ? "unPin" : "Pin"}
            </Button>
          ) : inbox ? (
            <Button variant="primary" onClick={handleNameChange}>
              Save
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleComment}
              disabled={text.trim() === "" ? true : false}
            >
              Reply
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReplyModal;
