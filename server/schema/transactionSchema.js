const moongose = require("mongoose");

const Schema = moongose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    date: {
        type: String,
    }
})

module.exports = moongose.model("transaction", transactionSchema);