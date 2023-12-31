const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    context: { type: String, required: true },
    imageURL: { type: String, required: false, default: null },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
})

module.exports = mongoose.model("Blog", BlogSchema)