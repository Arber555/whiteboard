const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        //unique: true
    }
});

module.exports = mongoose.model('User', UserSchema);