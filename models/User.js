const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    username: {type: String, default: ''},
    dateCreated: Date
});

mongoose.model('users', userSchema);