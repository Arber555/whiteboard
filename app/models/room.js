const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    nameRoom: {
        type: String,
        require: true,
        trim: true,
        //unique: true
    },
    line_history: [{
        line:[]
    }]
    
});

module.exports = mongoose.model('Room', RoomSchema);