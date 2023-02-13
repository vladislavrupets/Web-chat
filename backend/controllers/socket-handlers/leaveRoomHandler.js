module.exports = function leaveRoom(socket) {
  socket?.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("user left chatroom " + chatroomId);
  });
};
