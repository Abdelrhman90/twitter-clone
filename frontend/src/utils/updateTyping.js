import { io } from "socket.io-client";
let socket = io("http://localhost:3000");
let typing = false;
export const updateType = (connected, chatId) => {
  if (!connected) return;
  if (!typing) {
    typing = true;
    socket.emit("typing", chatId);
  }

  const lastTypingTime = new Date().getTime();

  setTimeout(() => {
    let timeNow = new Date().getTime();
    let timeDiff = timeNow - lastTypingTime;
    if (timeDiff >= 3000 && typing) {
      socket.emit("stop typing", chatId);
      typing = false;
    }
  }, 3000);
};
