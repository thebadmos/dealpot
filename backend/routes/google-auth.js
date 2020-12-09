const router = require("express").Router();
const passport = require("passport");

//auth with google
router
    .route("/google")
        .get(passport.authenticate("google",{
            scope:["profile"]//what we want to retrieve from the user profile...you could add other stuff into the array
        })
    );
//callback route for google to redirect to after auth
router
    .route("/google/redirect")
        .get(passport.authenticate("google"),(req,res)=>{
            return res.redirect("/");
            // res.status(200).json(req.user);
        })



module.exports = router;