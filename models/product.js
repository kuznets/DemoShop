const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    title: String,
    slug: String,
    description: String,
    price: Number,
    amount: Number, 
    img_url: String
});

module.exports = mongoose.model('Products', Product);