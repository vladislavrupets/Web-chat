const mongoose = require ('mongoose');

const messageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        messageText: {
            type: String,
            required: true
        }, 
        chatroomId: {
            type: String,
            required: true
        },
        sendDate: {
            type: String,
            required: true
        }
    }
);  

module.exports = mongoose.model("Message", messageSchema);