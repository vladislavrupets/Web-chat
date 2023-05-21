const mongoose = require("mongoose");
const User = require("../../models/userModel");
const Message = require("../../models/messageModel");
const Chatroom = require("../../models/chatroomModel");

class ChatroomHandler {
  joinRooms = (socket) => {
    socket?.on("joinRooms", async () => {
      try {
        const user = await User.findById(socket.userId).populate(
          "chatroomsList",
          "_id roomName"
        );
        if (user.chatroomsList) {
          const chatrooms = user.chatroomsList.map((chatroom) => {
            return {
              _id: chatroom._id.toString(),
              roomName: chatroom.roomName,
            };
          });

          const chatroomsIds = chatrooms.map((chatroom) => chatroom._id);
          socket.join(chatroomsIds);

          socket.emit("getAllChatrooms", chatrooms);
          console.log("user joined chatrooms " + chatroomsIds);

          const getLastMessages = async () => {
            let lastMessages = [];
            for (const chatroomId of chatroomsIds) {
              console.log(chatroomId);
              lastMessages.push(
                await Message.findOne({ chatroomId })
                  .sort({ _id: -1 })
                  .populate("user", "login")
              );
            }

            return lastMessages;
          };

          socket.emit("getLastMessages", await getLastMessages());
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  leaveRoom = (socket) => {
    try {
      socket?.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("user left chatroom " + chatroomId);
      });
    } catch (err) {
      console.log(err);
    }
  };

  enterChatroom = (socket) => {
    socket?.on("enterChatroom", async ({ chatroomId, messagesCount }) => {
      try {
        const messages = await Message.find({ chatroomId })
          .populate("user", "login")
          .sort({ _id: -1 })
          .skip(messagesCount)
          .limit(50);
        if (messages.length > 0) {
          socket.emit("getChatroomMessages", messages);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  createChatroom = (socket) => {
    socket?.on("createChatroom", async (chatroomName) => {
      try {
        if (await Chatroom.findOne({ roomName: chatroomName })) {
          throw "Chatroom with the same name already exists.";
        }
        Chatroom.create(
          { roomName: chatroomName },
          async (err, newChatroom) => {
            if (err) {
              console.log(err);
            } else {
              await User.updateOne(
                { _id: socket.userId },
                { $push: { chatroomsList: newChatroom } }
              );
              socket.emit("getNewChatroom", newChatroom);
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
  };
}

const getAllChatrooms = async (socket, chatroomsList) => {
  const user = [];
  try {
    if (!chatroomsList) {
      user = await User.findById(socket.userId).populate(
        "chatroomList",
        "roomName"
      );
      socket.emit("getAllChatrooms", user.chatroomsList);
    } else {
      socket.emit("getAllChatrooms", chatroomsList);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = new ChatroomHandler();
