const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aadhaar: { type: String, required: true },
    pan: { type: String, required: true },
    personalInfo: {
        name: String,
        email: String,
        phone: String,
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
