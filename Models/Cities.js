const mongoose = require('mongoose');
const CitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageURL: { type: String, required: false, default: null },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
})
module.exports = mongoose.model('Cities', CitySchema);