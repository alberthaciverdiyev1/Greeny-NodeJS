const mongoose = require('mongoose');

const ProductImmage = new mongoose.Schema({
    imageURL: { type: String, required: false, default: null },
    productId: { type: mongoose.Schema.Types.ObjectId, required: false, default: null},
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
})

module.exports = mongoose.model('ProductImmages', ProductImmage);