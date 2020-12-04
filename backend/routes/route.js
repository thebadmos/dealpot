const router = require("express").Router();
const search = require("../controllers/search_for_prod");


router
    .route("/search")
    .get((req,res,next)=>{
        res.render("search",{user:req.user});
    })
    .post(async(req,res,next)=>{
        try {
            console.log(req.body);
            const result = await search(req.body.search);
            res.status(200).json(result);    
        } catch (error) {
            console.log(error);
        }
    })




module.exports = router;