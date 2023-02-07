const generateUniqueId = require('generate-unique-id');
const User = require('../../models/userModel');
const Message = require('../../models/messageModel');

module.exports = function joinRoom(socket) {
    socket?.on('joinRooms', async () => {
        try {
            const user = await User.findById(socket.userId);
            socket.join(user.chatroomsList);
            console.log('user joined chatrooms ' + user.chatroomsList);

            let temp
            user.chatroomsList.map(chatroomId => {
                Message.findOne({ chatroomId: user.chatroomsList[0] }).sort({ _id: -1 }).exec((err, message) => {
                    temp = message;
                    console.log(temp)
                });
            });
            console.log(temp)
            

            
            
            socket.emit('getLastMessages', []);
        }
        catch (e) {
            console.log(e);
        }
    });
}