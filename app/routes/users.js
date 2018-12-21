const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', (req, res) => {
    console.log(req.body);
    const user = new User({name: req.body.name});

    user.save().then(result => {
        res.status(200).json({success: true, result});
    }).catch(err => {
        res.status(400).json({success: false, message: "Please fill all the data!"});
    });
});

module.exports = router;