const express               =   require('express');
const http                  =   require('http');
const path                  =   require('path');
const socketio              =   require('socket.io');
const Filter                =   require('bad-words');
const {generateMessage}     =   require('../src/utils/message');
const { addUser, removeUser , getUserById, getUsersByRoom} = require('../src/utils/users');

const app                   =   express();
const server                =   http.createServer(app);
const io                    =   socketio(server);

const port                  =   process.env.port || 3000;
const publicDirectoryPath   =   path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

let message     =   "Welcome in the world!";

// When User join chat below code trigger
io.on('connection', (socket)  =>{
    // Join Room Code
    socket.on('join',(options, callback) =>{
        const {error, user} =   addUser({id: socket.id, ...options});

        if(error) return callback(error)

        socket.join(user.room);
        // Welcome Message 

        socket.emit('welcomeMessage', generateMessage('Welcome My Friend!'));
        // Broadcast Message To All

        socket.broadcast.to(user.room).emit('welcomeMessage', generateMessage(`${user.userName} has Joined!`));
        io.to(user.room).emit('userList', {
            room  : user.room,
            users : getUsersByRoom(user.room)
        });
        callback()
    });
    // Send Message Code
    socket.on('sendMessage', (message, callback) =>{
        const user  =   getUserById(socket.id);
        const filter = new Filter();
        if(filter.isProfane(message)){ // filter removes the bad words or Profinity from chat
            return callback('No Profanity Please!');
        }
        io.to(user.room).emit('welcomeMessage', generateMessage(user.userName,message));
        callback()
    });
    // User disconnet code
    // If user leave or close window then all members get message except left user
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        
        if(user) {
            io.to(user[0].room).emit('welcomeMessage',`${user[0].userName} has left!`);
            io.to(user[0].room).emit('userList',{
                room    : user[0].room,
                users   : getUsersByRoom(user[0].room)
            });
        }
    });
    // Location code
    socket.on('sendLocation', (position,callback)  =>{
        const user  =   getUserById(socket.id);
        io.to(user.room).emit('locationService', generateMessage(user.userName,`https://google.com/maps?q=${position.latitude},${position.longitude}`));
        callback();
    });
});

// Express server configuration
server.listen(port, () => {
    console.log('The server is running on PORT: '+ port);
});