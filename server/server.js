const path = require('path');// installed in node
const http = require('http');// installed in node
const express = require('express');
const sochetIO = require('socket.io');

const publicPath = path.join(__dirname, '../public/');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = sochetIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Me',
        text: 'Hello to me',
        createdAt: 5698
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
