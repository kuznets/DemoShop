const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
    title: String,
    slug: String,
    ico_url: String
});

module.exports = mongoose.model('Categories', Category);