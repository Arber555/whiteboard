//document.addEventListener("DOMContentLoaded", function() {
    var mouse = { 
        click: false,
        move: false,
        pos: {x:0, y:0},
        pos_prev: false
    };
    // get canvas element and create context
    var canvas  = document.getElementById('drawing');
    var context = canvas.getContext('2d');
    var width   = window.innerWidth;
    var height  = window.innerHeight;
    var socket  = io.connect('', {query: 'name='+ window.localStorage.getItem('roomName') +''});

    var katrore = false;
    // set canvas to full browser width/height
    canvas.width = width;
    canvas.height = height;

    let katroreObj = {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    }
    // register mouse event handlers
    canvas.onmousedown = function(e){ 
        mouse.click = true; 
        if(katrore) {
            context.fillRect(e.clientX, e.clientY, 100, 100);
            katroreObj.x = e.clientX;
            katroreObj.y = e.clientY;
            
        }
    };
    canvas.onmouseup = function(e){ mouse.click = false; };

    canvas.onmousemove = function(e) {
        // normalize mouse position to range 0.0 - 1.0
        
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
    };

    function k () {
        katrore = true;
    }

    function rooms () {
        window.location.replace('http://localhost:3000/room');
    }


    //draw line received from server
    socket.on('draw_line', function (data) {
        //console.log(data);
        var line = data.line;
        context.beginPath();
        context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height);
        context.stroke();

        if(data.katrore) {
            context.fillRect(data.katrore.x, data.katrore.y, 100, 100);
        }
    });

    socket.emit('joinRoom', {room: window.localStorage.getItem('roomName')});

    // main loop, running every 25ms
    function mainLoop() {
        // check if the user is drawing
        if (mouse.click && mouse.move && mouse.pos_prev) {
            // send line to to the server
           // socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
           if(katrore) {
                socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ], room: window.localStorage.getItem('roomName'), katroreObj });
           } else {
            socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ], room: window.localStorage.getItem('roomName')});
           }
            
           //socket.emit('joinRoom', { line: [ mouse.pos, mouse.pos_prev ], room: window.localStorage.getItem('roomName') });

            katrore = false; 
            mouse.move = false;
        }
        mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
        setTimeout(mainLoop, 25);
    }
    mainLoop();
//});