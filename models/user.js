const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema

const UserSchema = mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    
    password: {
        type: String,
        required: true
    },
    role: { type: String },
});

const User = module.exports = mongoose.model('User', UserSchema);

