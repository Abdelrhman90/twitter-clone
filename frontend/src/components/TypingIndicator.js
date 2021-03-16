import React from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const TypingIndicator = () => {
  const { connected } = useSelector((state) => state.chat);
  return <div></div>;
};

export default TypingIndicator;
