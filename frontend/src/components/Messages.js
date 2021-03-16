import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const Messages = ({ message, nextMessage, lastSenderId }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const nextSenderId = nextMessage ? nextMessage.sender._id : "";
  const sender = message.sender;
  const senderName = `${sender.firstName} ${sender.lastName}`;
  const isLast = nextSenderId !== message.sender._id;
  const isMine = message.sender._id === userInfo.user._id;
  return (
    <li
      className={`message ${isMine ? "mine" : "theirs"} ${
        isLast ? "last" : ""
      }`}
    >
      {!isMine && (
        <div className="imageContainer">
          {isLast && <img src={sender.profilePic} alt="" />}
        </div>
      )}

      <div className="messageContainer">
        {!isMine && <span className="senderName">{senderName}</span>}
        <span className="messageBody">{message.content}</span>
      </div>
    </li>
  );
};

export default Messages;
