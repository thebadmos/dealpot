const router = require("express").Router();
const { fashion, 
        edible, 
        health, 
        homeAndKitchen, 
        officeAndSchool,
        phoneAndTablet,
        electronics,
        automobile,
        babyProduct,
        gaming,
        sportingGoods,
        computing,
        accessory } = require("../controllers/category_search/index");
const shuffle = require("../controllers/others/shuffleData");
const { User } = require("../models");

router
    .route("/category-fashion")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-fashion"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,fashion);
            } catch (error) {
                console.log(error);
            }
        })

router
    .route("/category-edible")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-edible"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,edible);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-care")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-care"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,health);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-home-kitchen")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-home-kitchen"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,homeAndKitchen);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-office-school")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-office-school"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,officeAndSchool);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-phone")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-phone"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,phoneAndTablet);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-electronics")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-electronics"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,electronics);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-automobile")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-automobile"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,automobile);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-baby-product")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-baby-product"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,babyProduct);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-video-game")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-video-game"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,gaming);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-sports")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-sports"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,sportingGoods);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-computing")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-computing"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,computing);
            } catch (error) {
                console.log(error);
            }
        })
router
    .route("/category-tech-accessories")    
        .get(async(req,res,next)=>{
            return res.render("search",{user:req.user,searchTerm:"",urlPath:"category-tech-accessories"});
})
        .post(async(req,res,next)=>{
            try {
                    postCategory(req,res,accessory);
            } catch (error) {
                console.log(error);
            }
        })


module.exports = router;


const postCategory = async(req,res,fn) => {
    let result = null;
    data = shuffle(await fn());
       if(req.isAuthenticated()){
            result = await User.findById(req.user.id).select("savedItems -_id");
            return res.status(200)
                .json({data,user:{isAuth:req.isAuthenticated(),userId:req.user.id},userSaves:result.savedItems});
            }
     res.status(200).json({data,user:{isAuth:req.isAuthenticated(),userId:null},userSaves:[]});
}