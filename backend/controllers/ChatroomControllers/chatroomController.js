const Chatroom = require('../../models/chatroomModel');

module.exports.createRoom = async (req, res) => {
    const { roomName } = req.body;
    console.log(roomName);
    
    if (await Chatroom.findOne({ roomName })) {
        throw 'Chatroom with the same name already exists.';
    }

    const chatroom = new Chatroom({
        roomName,
    });

    await Chatroom.create(chatroom);

    res.json({
        message: 'Chatroom created.',
    });
} 

module.exports.getAllRooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});
    
    res.json(chatrooms);
}