const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the Item Schema
const ItemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ItemModel = mongoose.model('item', ItemSchema);

module.exports = ItemModel;