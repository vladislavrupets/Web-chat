const Message = require('../models/messageModel');

module.exports = function onEnter(socket) {
    socket?.on('enter', async function () {
        let messages;
        try {
            messages = await Message.find({}).exec();
            socket.emit('receiveMessage', messages);
            console.log(messages);
        }
        catch (e) {
            console.log(e);
        }
    });
}
