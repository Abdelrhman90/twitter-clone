export const getChatName = (chatName, users) => {
  if (!chatName) {
    chatName = users
      .map((user) => {
        return `${user.firstName} ${user.lastName}`;
      })
      .join(", ");
  }
  return chatName;
};
