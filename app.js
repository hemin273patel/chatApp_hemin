const express = require('express'); // include this just like a php include
const app = express();
const io = require('socket.io')(); // active the chat plugin
//add routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));

// server up static files
app.use(express.static('public'));

//app.get('/', (req, res)=>{
//    res.sendFile(__dirname+ '/index.html');
//    
//});
//app.get('/contact', (req, res)=>{
//    res.sendFile(__dirname+ '/contact.html');
//    
//});
//app.get('/portfolio', (req, res)=>{
//    res.sendFile(__dirname+ '/portfolio.html');
//    
//});



const server = app.listen(3000, () => {
    console.log('listening on port 3000');
});



io.attach(server);

io.on('connection', socket => {
    console.log('user has connected');
    io.emit('chat Message', {for : 'everyone', message : `${socket.id} is here!`});
    
    socket.on('chat message', msg =>{
        io.emit('chat message', { for : 'everyone', message : msg});
    });
    
    
    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
    io.emit('disconnect message', `${socket.id} has left the building!`);
});

