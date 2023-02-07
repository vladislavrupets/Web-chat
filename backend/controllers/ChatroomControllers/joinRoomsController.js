const User = require('../../models/userModel');
const Message = require('../../models/messageModel');

module.exports = function joinRoom(socket) {
    socket?.on('joinRooms', async () => {
        try {
            const user = await User.findById(socket.userId);
            socket.join(user.chatroomsList);
            console.log('user joined chatrooms ' + user.chatroomsList);

            async function getLastMessages() {
                let lastMessages = []
                for (const chatroomId of user.chatroomsList) {
                    lastMessages.push(await Message.findOne({ chatroomId }).sort({ _id: -1 }))
                }
                return lastMessages;
            }
            
             socket.emit('getLastMessages', await getLastMessages());
        }
        catch (e) {
            console.log(e);
        }
    });
}