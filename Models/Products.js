const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: false, default: null },
    city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cities', required: false, default: null },
    price: { type: Number, required: true },
    description: { type: String, required: false, default: null },
    phone: { type: String, required: true, default: null },
    contact_type_id: { type: String, required: false, default: null },
    email: { type: String, required: true, default: null },
    imageURL: { type: String, required: false, default: null },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
});

module.exports = mongoose.model('Products', ProductSchema)