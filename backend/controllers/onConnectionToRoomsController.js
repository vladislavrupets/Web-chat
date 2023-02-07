const sendMessage = require('./sendMessageController');
const joinRooms = require('./ChatroomControllers/joinRoomsController');
const onEnterChatroom = require('./ChatroomControllers/onEnterChatroomController');
//const leaveRoom = require("./ChatroomControllers/leaveRoomComtroller");

module.exports = function onConnectionToRooms(io, socket) {
    joinRooms(socket);
    onEnterChatroom(socket);
    //leaveRoom(socket);
    sendMessage(io, socket);
};
