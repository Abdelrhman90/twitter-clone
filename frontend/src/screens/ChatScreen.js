import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { getChat, updateTyping } from "../redux/actions/chatActions";
import { updateType } from "../utils/updateTyping";
import { createMessage, getMessages } from "../redux/actions/messagesActions";
import { io } from "socket.io-client";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Messages from "../components/Messages";
import { getChatName } from "../utils/getChatName";
import TextInput from "../components/TextInput";
const ChatScreen = ({ match }) => {
  const maxUsers = 2;
  const chatId = match.params.id;
  let socket = io("http://localhost:3000");

  const { chat, loadingChat: loading } = useSelector((state) => state.chats);
  const { connected } = useSelector((state) => state.socket);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { messages, loading: loadingMessage } = useSelector(
    (state) => state.message
  );
  const [container, setContainer] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getChat(chatId));
      await dispatch(getMessages(chatId));
      setContainer(document.getElementsByClassName("chatMessages")[0]);
    };
    fetchData();
  }, [dispatch, chatId]);

  useEffect(() => {
    socket.emit("join room", chatId);
    socket.on("typing", () => console.log("typing"));
    socket.on("stop typing", () => console.log("no"));
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [container, chatId]);

  let remainingUsers = !loading && chat.users.length - maxUsers;
  remainingUsers--;
  const otherUsers =
    !loading && chat.users.filter((user) => user._id !== userInfo.user._id);
  const chatName = !loading && getChatName(chat.chatName, otherUsers);

  const sendMessage = async (e) => {
    await dispatch(createMessage(message, chatId));
  };

  const messageHandler = async (e) => {
    sendMessage();
    setMessage("");
  };

  const keyHandler = async (e) => {
    updateType(connected, chatId);

    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      setMessage("");
    }
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
              <h1>Chat</h1>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className="chatPageContainer">
                <div className="chatTitleBarContainer">
                  <div className="chatImagesContainer">
                    {remainingUsers > 0 && (
                      <div className="userCount">+{remainingUsers}</div>
                    )}
                    {otherUsers.map((user) => {
                      if (user._id === userInfo.user._id) return;
                      return (
                        <img key={user._id} src={user.profilePic} alt="" />
                      );
                    })}
                  </div>
                  <Modal inbox chatName={chatName} />
                </div>
                <div className="mainContentContainer">
                  <div className="chatContainer">
                    <ul className="chatMessages">
                      {loadingMessage ? (
                        <Loader />
                      ) : (
                        <>
                          {messages.map((message, index) => {
                            const nextMessage = messages[index + 1];

                            return (
                              <Messages
                                key={message._id}
                                message={message}
                                nextMessage={nextMessage}
                              />
                            );
                          })}
                        </>
                      )}
                    </ul>
                    {/* {show ? <h2>Typing</h2> : null} */}
                    <div className="chatFooter">
                      <TextInput
                        changeHandler={(e) => setMessage(e.target.value)}
                        message={message}
                        keyHandler={keyHandler}
                        messageHandler={messageHandler}
                      />
                    </div>
                  </div>
                </div>
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

export default ChatScreen;
