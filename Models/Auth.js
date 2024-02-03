const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is required"], lowercase: true, validate: [validator.isAlphanumeric, "Only alphanumeric characters"], unique: true, default: null },
    email: { type: String, required: [true, "Email is required"], validate: [validator.isEmail, "Valid email is required"], unique: true, default: null },
    name: { type: String, required: false, default: null },
    surname: { type: String, required: false, default: null },
    age: { type: Number, required: false, default: null },
    gender: { type: String, required: false, default: null },
    password: { type: String, required: true, minLenght: [6, "At least 6 character"] },
    rememberMe: { type: Boolean, default: false }
});
module.exports = mongoose.model('user', postSchema);