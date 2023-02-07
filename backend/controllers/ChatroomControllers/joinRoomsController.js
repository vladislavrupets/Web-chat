const User = require('../../models/userModel');
const Message = require('../../models/messageModel');

module.exports = function joinRoom(socket) {
    socket?.on('joinRooms', async () => {
        try {
            const user = await User.findById(socket.userId);
            socket.join(user.chatroomsList);
            console.log('user joined chatrooms ' + user.chatroomsList);

            

            async function test(){
                let lastMessages = []
                Promise.all(
                return user.chatroomsList.map(async chatroomId => {
                    lastMessages.push(await Message.findOne({chatroomId}).sort({ _id: -1 }))
                });
                )
            }
            
            const capitalizeProductsIds = async () => {
                const products = await getProducts()
              
                Promise.all(
                  products.map(async (product) => {
                    const productId = await getProductId(product);
                    console.log(productId);
              
                    const capitalizedId = await capitalizeId(productId)
                    console.log(capitalizedId);
                  })
                )
              
                console.log(products);
              }
              capitalizeProductsIds();
              
            let bebros = await test();
            console.log(bebros)
            
            

            
            
            socket.emit('getLastMessages', []);
        }
        catch (e) {
            console.log(e);
        }
    });
}