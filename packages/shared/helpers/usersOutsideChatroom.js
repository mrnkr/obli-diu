const usersOutsideChatroom = (chatroom) => (users) => {
  const usersInChatroom = new Map(chatroom.users.map((u) => [u.id, true]));
  return users?.filter((u) => !usersInChatroom.has(u.id)) ?? [];
};

export default usersOutsideChatroom;
