const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true},
    age: { type: Number, required: true },
    gender: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: true },
    rememberMe: { type: Boolean, default: false }
});
module.exports = mongoose.model('user', postSchema);