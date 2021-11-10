const usersImNotChattingWith = (currentUser, chatrooms) => (users) => {
  const usersImChattingWith = new Map(
    chatrooms
      .filter((c) => !c.isGroup)
      .map((c) => [c.users.find((u) => u.id !== currentUser?.id)?.id, true]),
  );

  return (
    users?.filter(
      (u) => u.id !== currentUser?.id && !usersImChattingWith.has(u.id),
    ) ?? []
  );
};

export default usersImNotChattingWith;
