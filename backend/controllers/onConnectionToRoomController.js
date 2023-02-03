const sendMessage = require('./sendMessageController');
const joinRooms = require('./ChatroomControllers/joinRoomsController');
const onEnter = require('./ChatroomControllers/onEnterController');
//const leaveRoom = require("./ChatroomControllers/leaveRoomComtroller");

module.exports = function onConnectionToRoom(io, socket) {
    joinRooms(socket);
    onEnter(socket);
    //leaveRoom(socket);
    sendMessage(io, socket);
};
