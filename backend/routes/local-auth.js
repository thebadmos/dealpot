const router = require("express").Router();
const { User } = require("../models");
 


router
    .route("/")
    .post(async(req,res,next)=>{
        const findUser = await User.find({username:req.body.username}).select("username password");
        if(!findUser.length){
            let result = await User.create(req.body);
            return res.status(200).json({username:result.username,password:result.password});
        }
        return res.status(401).json({message:"Username taken"});
    })


module.exports = router;