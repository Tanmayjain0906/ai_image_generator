const moongose = require("mongoose");

const Schema = moongose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    creditBalance: {
        type: Number,
        default: 5,
    } 

})

module.exports = moongose.model("user", userSchema);