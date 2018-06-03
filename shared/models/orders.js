const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Orders = new Schema({
    uid: {type: String, required: true},
    user_name: {type: String, required: true},
    user_city: {type: String, required: true},
    user_email: {type: String, required: true},
    products: {type: Array, required: true},
    status: {type: String, enum: [
        "Заказано",
        "Формируется",
        "Доставляется",
        "Подано"
    ]},
    price_sum: {type: Number, default: 0, required: true},
    ordred: {type: Date, default: Date.now},
    finished: Date
});

module.exports = mongoose.model('Orders', Orders);
