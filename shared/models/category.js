const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    ico_url: String
});

module.exports = mongoose.model('Categories', Category);