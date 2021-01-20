const mongoose = require("mongoose");
const  productSchema  = require("./product-schema");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    email: String,
    savedItems:[ productSchema ],
    notifications:[],
    numbOfNotification:{
        type: Number,
        default: 0
    }
});

const User = mongoose.model("user",userSchema);

module.exports = User;