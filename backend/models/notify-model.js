const mongoose = require("mongoose");

const Notify = mongoose.model("notify",new mongoose.Schema({
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
    priceHistory:[ String ],
    notifyUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    ]
}));

module.exports = Notify;