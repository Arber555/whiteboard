const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { mongoose, dbURL } = require('./app/DB_config/database');
mongoose.set('useFindAndModify', false);

//middleware
app.use(bodyParser.json());

//make the folder public
app.use(express.static(__dirname + '/public'));

//server and socket
const server = http.createServer(app);
const io = socketIo.listen(server);

//drawing controllers
const drawing = require('./app/controllers/drawing')(io); 

mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${dbURL}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

server.listen(3000, () => {
    console.log("Server running on 127.0.0.1:3000");
});

//routes
const usersRoutes = require('./app/routes/users');
const roomsRoutes = require('./app/routes/rooms').router;
//Routes handle requests
app.use('/users', usersRoutes);
app.use('/rooms', roomsRoutes);
 
// event-handler for new incoming connections
io.on('connection', function (socket) {
 
   socket.on('joinRoom', (data) => {
       socket.join(data.room);
       drawing.loadData(data);
   });

   socket.on('draw_line', function (data) {
        drawing.drawData(data);        
        // send data to all clients
        io.in(data.room).emit('draw_line', { line: data.line, katrore: data.katroreObj });
    });
});

app.get('/whiteboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/whiteboard.html'));
});

app.get('/room', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/room.html'));
});