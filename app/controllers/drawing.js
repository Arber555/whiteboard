module.exports = (io) => {
    // array of all lines drawn  
    let room1_history = [];
    let room2_history = [];
    let room3_history = [];
    let room4_history = [];

    let room1_katrore = [];
    let room2_katrore = [];
    let room3_katrore = [];
    let room4_katrore = [];

    const loadData = (data) => {
        switch(data.room) {
            case 'room1':
                for (let i in room1_history) {
                    io.in(data.room).emit('draw_line', { line: room1_history[i] , katrore: room1_katrore[i] } );
                }
                break;
            case 'room2':
                //console.log(room2_history);
                for (let i in room2_history) {
                    io.in(data.room).emit('draw_line', { line: room2_history[i] , katrore: room2_katrore[i] } );
                }
                break;
            case 'room3':
                //console.log(room2_history);
                for (let i in room3_history) {
                    io.in(data.room).emit('draw_line', { line: room3_history[i] , katrore: room3_katrore[i] } );
                }
                break;
            case 'room4':
                //console.log(room2_history);
                for (let i in room4_history) {
                    io.in(data.room).emit('draw_line', { line: room4_history[i] , katrore: room4_katrore[i] } );
                }
                break;
        }
    }

    const drawData = (data) => {
        switch(data.room) {
            case 'room1':
                room1_history.push(data.line);
                if(data.katroreObj) {
                    room1_katrore.push(data.katroreObj);
                    console.log(data.katroreObj);
                }
                break;
            case 'room2':
                room2_history.push(data.line);
                console.log(data.katroreObj);
                if(data.katroreObj) {
                    room2_katrore.push(data.katroreObj);
                    console.log(data.katroreObj);
                }
                break;
            case 'room3':
                room3_history.push(data.line);
                console.log(data.katroreObj);
                if(data.katroreObj) {
                    room3_katrore.push(data.katroreObj);
                    console.log(data.katroreObj);
                }
                break;
            case 'room4':
                room4_history.push(data.line);
                console.log(data.katroreObj);
                if(data.katroreObj) {
                    room3_katrore.push(data.katroreObj);
                    console.log(data.katroreObj);
                }
                break;
        }
    }
    return {loadData, drawData};
}