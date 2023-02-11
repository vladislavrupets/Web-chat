const sendMessage = require('./socket-handlers/sendMessageHandler');
const joinRooms = require('./socket-handlers/joinRoomsHandler');
const enterChatroom = require('./socket-handlers/EnterChatroomHandler');
//const leaveRoom = require("./ChatroomControllers/leaveRoomComtroller");

module.exports = function connectionToChat(io, socket) {
    joinRooms(socket);
    enterChatroom(socket);
    //leaveRoom(socket);
    sendMessage(io, socket);
};