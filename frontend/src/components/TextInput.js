import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const TextInput = ({ keyHandler, messageHandler, changeHandler, message }) => {
  return (
    <>
      <textarea
        name="textarea"
        placeholder="Type a message..."
        value={message}
        onChange={changeHandler}
        onKeyDown={keyHandler}
      />
      <button className="sendMessageBtn" onClick={messageHandler}>
        <FaPaperPlane />
      </button>
    </>
  );
};

export default TextInput;
