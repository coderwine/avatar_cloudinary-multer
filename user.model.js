const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    avatar: String
});

module.exports = mongoose.model('User', UserSchema)