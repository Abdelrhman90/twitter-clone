import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getChatName } from "../utils/getChatName";
const Chat = ({ chat }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const latestMessage = chat.latestMessage;
  const users =
    chat.users.length == 1
      ? chat.users
      : chat.users.filter((user) => user._id !== userInfo.user._id);

  const groupChatClass = users.length > 1 ? "groupChat" : "";

  const getChatImage = (users) => {
    let chatImages = [];
    chatImages.push(users[0].profilePic);
    if (users.length > 1) {
      chatImages.push(users[1].profilePic);
    }

    return chatImages.map((image, index) => (
      <img key={index} src={image} alt="" />
    ));
  };
  return (
    <Link to={`/messages/${chat._id}`} className="resultListItem">
      <div className={`resultImageContainer ${groupChatClass}`}>
        {getChatImage(users)}
      </div>
      <div className="resultsDetailsContainer ellipsis">
        <span className="heading ellipsis">
          {getChatName(chat.chatName, users)}
        </span>
        <span className="subtext ellipsis">
          {latestMessage
            ? `${latestMessage.sender.firstName} ${latestMessage.sender.lastName}: ${latestMessage.content}`
            : "New Chat"}
        </span>
      </div>
    </Link>
  );
};

export default Chat;
