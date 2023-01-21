const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const server = http.createServer(app);
const io = require('socket.io')(server)

const onConnection = require('./controllers/onConnectionController');

const PORT = process.env.PORT || 8000;
const ip = '26.64.252.244';


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());

io.on('connection', socket => {
    console.log('user connected', socket.id);
    onConnection(io, socket);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

async function start (port, ip){
    try {
        await mongoose.connect('mongodb+srv://sherpak:1111@cluster0.ajadfyc.mongodb.net/Messenger?retryWrites=true&w=majority');
        server.listen(port, ip, () => {
            console.log('server started on ' + ip + ':' + port);
        });  
    }
    catch (e) {
        console.log(e);
    }
}

start(PORT, ip);



