const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    dob: String
});

const customerModel = mongoose.model('Customers', customerSchema);

module.exports = customerModel;