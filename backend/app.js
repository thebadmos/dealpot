const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const search = require("./controllers/search_for_prod");
const signupRoute = require("./routes/local-auth");
const searchRoute = require("./routes/route");

// search("headphone")
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err));

const category = ["groceries"]

//connect to mongoose
mongoose.connect("mongodb://localhost/dealpot",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("MongoDb is hot"))
    .catch(err=>console.log("Err..looks like something broke",err.message));

app.set("view engine","ejs");
app.set("views",`${path.join(__dirname,'views')}`);
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use("/signup",signupRoute);
app.use("/",searchRoute);
app.get("/",(req,res,next)=>{
    return res.render("index",{user:req.user});
})

module.exports = app;