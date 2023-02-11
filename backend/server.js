const app = require('./app');
const jwt = require('jwt-then');
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
require('dotenv').config();

const connectionToChat = require('./controllers/connectionToChatController');

const PORT = process.env.PORT || 8000;
const IP = process.env.IP || 'localhost';
const DB_LINK = process.env.DB_LINK;

async function start (port, ip, dbLink){
    try {
        await mongoose.connect(dbLink);
        server.listen(port, ip, () => {
            console.log('server started on ' + ip + ':' + port);
        });
    }
    catch (err) {
        console.log(err);
    }
}

start(PORT, IP, DB_LINK);

const userNamespace = io.of("/users");

userNamespace.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    }
    catch (err) {
        console.log(err);
    }
});



userNamespace.on('connection', socket => {
    console.log('user connected', socket.userId);
    connectionToChat(userNamespace, socket);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.userId);
    });
});




