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
                    postCategory(req,res,"category-fashion",fashion);
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
                    postCategory(req,res,"category-edible",edible);
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
                    postCategory(req,res,"category-care",health);
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
                    postCategory(req,res,"category-home-kitchen",homeAndKitchen);
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
                    postCategory(req,res,"category-office-school",officeAndSchool);
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
                    postCategory(req,res,"category-phone",phoneAndTablet);
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
                    postCategory(req,res,"category-electronics",electronics);
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
                    postCategory(req,res,"category-automobile",automobile);
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
                    postCategory(req,res,"category-baby-product",babyProduct);
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
                    postCategory(req,res,"category-video-game",gaming);
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
                    postCategory(req,res,"category-sports",sportingGoods);
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
                    postCategory(req,res,"category-computing",computing);
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
                    postCategory(req,res,"category-tech-accessories",accessory);
            } catch (error) {
                console.log(error);
            }
        })


module.exports = router;


const postCategory = async(req,res,urlPath,fn) => {
    let result = null;
    let pagination = req.body.page || 1;
    console.log(req.body)
    data = shuffle(await fn(pagination));
       if(req.isAuthenticated()){
            result = await User.findById(req.user.id).select("savedItems -_id");
            return res.status(200)
                .json({data,user:{isAuth:req.isAuthenticated(),userId:req.user.id},userSaves:result.savedItems,pageNo:pagination,urlPath});
            }
     res.status(200).json({data,user:{isAuth:req.isAuthenticated(),userId:null},userSaves:[],pageNo:pagination,urlPath});
}