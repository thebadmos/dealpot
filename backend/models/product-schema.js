const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    vendor:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    notify:{
        type:Boolean,
        default:false
    }
});


module.exports = productSchema;