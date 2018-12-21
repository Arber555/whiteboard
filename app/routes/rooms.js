//it was used for testing something

const express = require('express');
const router = express.Router();

const Room = require('../models/room');

router.post('/', (req, res) => {
    console.log(req.body);
    const room = new Room({nameRoom: req.body.nameRoom});

    room.save().then(result => {
        res.status(200).json({success: true, result});
    }).catch(err => {
        res.status(400).json({success: false, message: "Please fill all the data!"});
    });
});

router.get('/', (req, res) => {
    Room.find().then(rooms => {
        res.status(200).json({success: true, rooms});
    }).catch(err => {
        res.status(400).json({success: false, err});
    });
});

const saveLines = (room, lines) => {
    Room.findOne({nameRoom: room}).then(room => {
        line_history = room.line_history.push(lines);
        console.log(lines);
        Room.findOneAndUpdate({ nameRoom: room.nameRoom}, {$push: {line_history: lines}}).then(result => {
            if(!result) {
               return console.log('Error 404 te updata');
            }
            
            console.log('success');
        });
    }).catch(err => {
        console.log(err + " ");
    })
}

const getLines = (room) => {
    Room.findOne({nameRoom: room}).then(room => {
        if(!room) {
            return console.log('Error 404');
        }
        console.log(room.line_history);
        return room.line_history;
    }).catch(err => {
        console.log(err + " ");
    });
}

module.exports = {router, fo: {saveLines, getLines}};