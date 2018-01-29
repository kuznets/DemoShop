const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
    _id: String,
    title: String,
    ico_url: String
});

module.exports = mongoose.model('Categories', Category);