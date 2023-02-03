const Message = require('../../models/messageModel');
const User = require('../../models/userModel');
const mongoose = require('mongoose');
const { login } = require('../userController');

module.exports = function onEnter(socket) {
    socket?.on('enter', async function ({ chatroomId }) {
        try {
            const messages = await Message.find({ chatroomId }).populate('user', 'login')
            console.log(messages);
            socket.emit('receiveMessagesOnEnter', messages);
        }
        catch (err) {
            console.log(err);
        }
    });
}
