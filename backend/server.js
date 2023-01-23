const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const server = http.createServer(app);
const io = require('socket.io')(server);
require('dotenv').config();

const onConnection = require('./controllers/onConnectionController');

const PORT = process.env.PORT || 8000;
const IP = process.env.IP || 'localhost';
const DB_LINK = process.env.DB_LINK;


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Redirect');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
app.use(cors());
app.use(express.json());

app.use('/user', require('./routes/user'));
app.use('/chatroom', require('./routes/chatroom'));

app.get("/messages", (req, res) => {
    res.send("Hello");
});

io.on('connection', socket => {
    console.log('user connected', socket.id);
    onConnection(io, socket);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

async function start (port, ip){
    try {
        await mongoose.connect(DB_LINK);
        server.listen(port, () => {
            console.log('server started on ' + ip + ':' + port);
        });  
    }
    catch (e) {
        console.log(e);
    }
}

start(PORT, IP);



