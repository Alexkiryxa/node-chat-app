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
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined us',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        //io.emit emits the event to every connection, socket.emit emits the event to single connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        //socket.broadcast.emit send the event to everybody but this socket
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
