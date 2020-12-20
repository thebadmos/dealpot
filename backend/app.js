// process.NODE_ENV = "production"

const express = require("express");
const app = express();

if(app.get('env') === 'development') require("dotenv").config({ debug: process.env.DEBUG });

const config = require("config")
const mongoose = require("mongoose");
const cors = require("cors")
const path = require("path");
const passport = require("passport");
const cookie = require("cookie-session");
require("./auth/passport-oauth");
const search = require("./controllers/search_for_prod");
const googleRoute = require("./routes/google-auth");
const signupRoute = require("./routes/local-auth");
const searchRoute = require("./routes/route");
const categoryRoute = require("./routes/categoryRoute");
require("./controllers/others/jobSchedular");
// require("./controllers/category_search/fashion");

// search("headphone")
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err));


//connect to mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
if(process.env.NODE_ENV == "production"){
    mongoose.connect(config.get("cloudDatabase"))
    .then(()=>console.log("MongoDbAtlas is hot"))
    .catch(err=>console.log("Err..looks like something broke @mongoAtlas",err.message));
}else{
    mongoose.connect("mongodb://localhost/dealpot")
    .then(()=>console.log("MongoDb is hot"))
    .catch(err=>console.log("Err..looks like something broke",err.message));
}


app.set("view engine","ejs");
app.set("views",`${path.join(__dirname,'views')}`);
app.use(cors());
app.use(cookie({keys:["Hello secret"]}))
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth",googleRoute);
app.use("/signup",signupRoute);
app.use("/",searchRoute);
app.use("/",categoryRoute);
app.get("/",(req,res,next)=>{
    return res.render("index",{user:req.user,searchTerm:""});
})

module.exports = app;