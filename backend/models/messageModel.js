const mongoose = require ('mongoose');

const messageSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    {
    timestamps: true
    }
);  

module.exports = mongoose.model("Message", messageSchema);