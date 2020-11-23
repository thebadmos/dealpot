module.exports.add = (a,b) => a + b; 
module.exports.multiply = (a,b) => a * b;
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine","ejs");
app.set("views",`${path.join(__dirname,'views')}`)

app.get("/",(req,res,next)=>{
    return res.render("index")
})
const port = process.env.PORT || 3900
app.listen(port,()=>console.log(`Server is hot @ ${port}`));

