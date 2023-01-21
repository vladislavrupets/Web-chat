const onEnter = require('./onEnterController');
const sendMessage = require('./sendMessageController');

module.exports = function onConnection(io, socket) {
    onEnter(socket);
    sendMessage(io, socket);
}

    