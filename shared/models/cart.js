const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema({
    products: {type: Array, default: []},
    uid: String,
    count: {type: Number, default: 0},
    total_price: {type: Number, default: 0},
    description: String
});

module.exports = mongoose.model('Cart', Cart);
