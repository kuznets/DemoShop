const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema({
    products: {type: Array, default: [], required: true},
    uid: {type: String, required: true},
    count: {type: Number, default: 0, required: true},
    total_price: {type: Number, default: 0, required: true},
    description: {type: String, default: ''}
});

module.exports = mongoose.model('Cart', Cart);
