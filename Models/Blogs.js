const mongoose = require('mongoose');
const BlogAddSchema = new mongoose.Schema({
    title: { type: String, required: true },
    context: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Blog",BlogAddSchema)