const mongoose = require('mongoose');

const config = {
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/whiteboardDB'
}

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true });

module.exports = { mongoose, dbURL: config.database };