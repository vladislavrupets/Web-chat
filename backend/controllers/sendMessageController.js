const Message = require('../models/messageModel');

module.exports = function sendMessage(io, socket) {
    socket?.on('sendMessage', async function (data) {
        let message;
        try {
            message = await Message.create(data);
        }
        catch (e) {
            console.log(e);
        }
        io.emit('receiveMessage', [message]);
    });
}
