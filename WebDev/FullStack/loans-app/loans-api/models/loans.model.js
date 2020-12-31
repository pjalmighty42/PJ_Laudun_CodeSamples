const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loansSchema = new Schema({
    loanName: String,
    loanType: String,
    amount: String,
    issueDate: Date,
    status: String
});

const loanModel = mongoose.model('Loans', loansSchema);

module.exports = loanModel;