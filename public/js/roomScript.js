// $(() => {
//     let rooms = $('#rooms');

//     $.ajax({
//         url: 'http://localhost:3000/rooms/',
//         type:'GET',
//         contentType: 'application/json',
//         dataType: 'json'
//     }).done(data => {
//         if(data.success) {
//             console.log(data);
//             for(let i = 0; i < data.rooms.length; i++) {
//                 rooms.append('<li style="padding: 10px 20px; border-bottom: 1px solid #ccc;"  onclick="goToRoom(\''+ data.rooms[i].nameRoom +'\')"> ' + data.rooms[i].nameRoom + '</li>');
//             } 
//         }
//     });
// });
$('#useri').text('Hello: '+ window.localStorage.getItem('name'));

const goToRoom = (roomName) => {
    console.log(roomName);
    window.localStorage.setItem('roomName', roomName);
    window.location.replace('http://localhost:3000/whiteboard');
}