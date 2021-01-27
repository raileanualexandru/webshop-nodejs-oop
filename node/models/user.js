const mongoose = require('mongoose');

//User Schema

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: false
    },

    lastName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true
    },

    password1: {
        type: String,
        required: true
    }
    

    });

    const User = mongoose.model('user', UserSchema);

    module.exports = User;