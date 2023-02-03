const generateUniqueId = require('generate-unique-id');
const User = require('../../models/userModel');

module.exports = function joinRoom(socket) {
    socket?.on('joinRooms', async () => {
        try {
            const user = await User.findOne({ _id: socket.userId });
            socket.join(user.chatroomsList);
            console.log('user joined chatrooms ' + user.chatroomsList);
        }
        catch (e) {
            console.log(e);
        }
    });
}