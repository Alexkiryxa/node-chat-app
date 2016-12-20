const path = require('path');// installed in node
const http = require('http');// installed in node
const express = require('express');
const sochetIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname, '../public/');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = sochetIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');



    socket.on('join', (params, callback) => {
        if ( !isRealString(params.name) || !isRealString(params.room) ) {
            return callback('Name and room are required');
        }

        socket.join(params.room);
        //socket.leave('Name')
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        //io.emit emits the event to every connection, socket.emit emits the event to single connection
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        //socket.broadcast.emit send the event to everybody but this socket
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
