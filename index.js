const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
require('dotenv').config();
const port = process.env.PORT || 3000;
app.use('/', express.static(__dirname));
app.get('/', function(req, res){
    res.send('index.html');
}) 
io.on('connection', (socket) => {
    io.emit('new-user');
    socket.on('chat message', (msg) => {
        
      io.emit('chat message', msg);
    });
  });
server.listen(port,() => {
    console.log("Server listening on port " + port);
});
 