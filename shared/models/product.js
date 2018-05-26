const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    price: { type: Number, default: 0 },
    amount: { type: Number, default: 0 }, 
    img_url: String,
});

module.exports = mongoose.model('Products', Product);