const mongoose = require("mongoose");
const  productSchema  = require("./product-schema");

const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        default: "null"
    },
    googleId: {
        type: String,
        default: "null"
    },
    thumbnail: {
        type: String,
        default: "null"
    },
    email: String,
    savedItems:[ productSchema ] 
});

const User = mongoose.model("user",userSchema);

module.exports = User;