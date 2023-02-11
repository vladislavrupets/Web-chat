const express = require('express');
const app = express();
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const chatroomRoute = require('./routes/chatroomRoute')

app.use(cors());
app.use(express.json());
app.use('/user', userRoute);
app.use('/chatroom', chatroomRoute);

module.exports = app;








