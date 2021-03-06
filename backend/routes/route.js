const router = require("express").Router();
const search = require("../controllers/search_for_prod").searchVendors;
const shuffle = require("../controllers/others/shuffleData");
const { formatTitle } = require("../controllers/others/formatTitle");
const { User, NotifyUser } = require("../models");
let data = []; 



router
    .route("/search")
    .get(async(req,res,next)=>{
        // data = await search(req.query.search);
        if(req.query.q){
           return res.render("search",{user:req.user,searchTerm:req.query.q || "",urlPath:"search"});
        }
        return res.redirect("/");
    })
    .post(async(req,res,next)=>{
        try {
            let result = null;
            let pagination = req.body.page || 1;
                data = shuffle(await search(req.body.search,pagination));
            if(req.isAuthenticated()){
                result = await User.findById(req.user.id).select("savedItems -_id");
                return res.status(200)
                .json({data,user:{isAuth:req.isAuthenticated(),userId:req.user.id},userSaves:result.savedItems,pageNo:pagination});
            }
                

            res.status(200).json({data,user:{isAuth:req.isAuthenticated(),userId:null},userSaves:[],pageNo:pagination});    
        } catch (error) {
            console.log(error);
        }
    })
    router
    .route("/customer/account/create")
        .get((req,res,next)=>{
            if(req.isAuthenticated()){
                return res.redirect("/")
            }else{
                next();
            }
        },(req,res)=>{//auth login
            res.render("signup")
        })

//auth logout
router
    .route("/customer/logout")
        .get((req,res)=>{
            //handle with passport
            req.logOut();
            res.redirect("/");
            //res.send("Logging out")
        })

router
    .route("/customer/wishlist/add")
        .post(async(req,res)=>{
            if(req.isAuthenticated()){
                const user = await User.findById(req.user.id);
                let product = {};
                if(req.body.prodItem){
                    product = user.savedItems.find(item=>item.url === req.body.prodItem.url);
                }else{
                    product = user.savedItems.find(item=>item.url === req.body.url);
                }
                if(!product){
                    user.savedItems.push({
                        vendor:req.body.prodItem.vendor,
                        title:req.body.prodItem.itemTitle,
                        imgUrl:req.body.prodItem.imgUrl,
                        price:req.body.prodItem.itemPrice,
                        url:req.body.prodItem.url,
                        sku:req.body.prodItem.sku || 0,
                    })
                    await user.save();
                    return res.json({message:true});
                }
               else{
                   const prodToBeRemoved = await user.savedItems.id(product._id);
                   if(prodToBeRemoved.notify){
                    let findProdNotify = await NotifyUser.findOne({url:product.url});
                    const findUserIdx = findProdNotify.notifyUsers.findIndex(id=>id == req.user.id);
                        findProdNotify.notifyUsers.splice(findUserIdx,1);
                    if(!findProdNotify.notifyUsers.length){
                        await NotifyUser.findByIdAndDelete(findProdNotify._id);
                        console.log("No more watching this product notification")
                    }else{
                        await findProdNotify.save();
                    }
                   }
                   await prodToBeRemoved.remove();
                   await user.save();
                   return res.json({message:false});
               }
            }
            return res.json({message:"YOu are not logged in"})
        })
router
    .route("/customer/notify/add")
        .post(async(req,res)=>{
            if(req.isAuthenticated()){
                const user = await User.findById(req.user.id);
                let product = {};

                if(req.body.prodItem){
                    product = req.body.prodItem;
                }else{
                    product = user.savedItems.find(item=>item.url === req.body.url);
                }
                let findProd = await NotifyUser.findOne({url:product.url})
                
                // if(product.length){
                //     findProd = await NotifyUser.findOne({url:product[0].url});
                // }else{
                //    product = await user.savedItems.filter(prod=>prod.url === url);
                //    findProd = await NotifyUser.findOne({url:product[0].url});
                // }

                if(!findProd){
                    const result = await NotifyUser.create({
                        vendor:product.vendor,
                        title:product.itemTitle || product.title,
                        imgUrl:product.imgUrl,
                        price:product.itemPrice || product.price,
                        url:product.url,
                        sku:product.sku || 0,
                        notifyUsers:[req.user.id]
                    })
                    const findProdIdx = user.savedItems.findIndex(prod=>prod.url === product.url);
                    if(findProdIdx > -1){
                        user.savedItems[findProdIdx].notify = true;
                        await user.save();
                    }else{

                        user.savedItems.push({
                            vendor:product.vendor,
                            title:product.itemTitle || product.title,
                            imgUrl:product.imgUrl,
                            price:product.itemPrice || product.price,
                            url:product.url,
                            sku:product.sku || 0,
                            notify: true
                        });
                        await user.save();
                    }    
                     return res.json({message:true});
            }else{
                const findUserIdx = findProd.notifyUsers.findIndex(id=>id == req.user.id);
                if(findUserIdx > -1){
                    findProd.notifyUsers.splice(findUserIdx,1);
                    if(!findProd.notifyUsers.length){
                        await NotifyUser.findByIdAndDelete(findProd._id);
                        console.log("No more watching this product notification")
                    }else{
                        await findProd.save();
                    }
                    const findProdIdx = user.savedItems.findIndex(prod=>prod.url === product.url);
                    if(findProdIdx > -1){
                        user.savedItems[findProdIdx].notify = false;
                        await user.save();
                    }
                    return res.json({message:false});
                }else{
                    const findProdIdx = user.savedItems.findIndex(prod=>prod.url === product.url);
                    findProd.notifyUsers.push(req.user.id);
                    await findProd.save();
                    if(findProdIdx < 0){
                        user.savedItems.push({
                            vendor:product.vendor,
                            title:product.itemTitle || product.title,
                            imgUrl:product.imgUrl,
                            price:product.itemPrice || product.price,
                            url:product.url,
                            notify: true,
                            sku:product.sku || 0,
                            priceHistory:[...findProd.priceHistory]
                        });
                        user.save();
                    }else{
                        user.savedItems[findProdIdx].notify = true;
                        
                        await user.save();
                    }
                }
                
                return res.json({message:true});
            }
        }
            return res.json({message:"login"});
        })
router
    .route("/customer/wishlist")
    .get(async(req,res,next)=>{
        if(req.isAuthenticated()){
            const result = await User.findById(req.user.id).select("savedItems");
            const data = formatTitle(result.savedItems);
            return res.render("wishlist",{user:req.user,result:data,searchTerm:""});
        }
        res.redirect("/customer/account/create")
    })
    .post(async(req,res,next)=>{
        if(req.body.pwd){
            const result = await User.findById(req.user.id);
            const product = await result.savedItems.id(req.body.id);
            return res.json({wishlistData:[product.price,product.priceHistory]});
        }
    })
router
    .post("/customer/notification",async(req,res,next)=>{
        if(req.user && req.body.pwd){
            await User.findByIdAndUpdate(req.user.id,{$set:{numbOfNotification:0}},{new:true});
            return res.json({message:true});
        }else{
            return res.json({message:false});
        }
    })
router
    .get("/notify",async(req,res,next)=>{
        // await NotifyUser.deleteMany()
        const result = await NotifyUser.find().populate("user");
        return res.json(result)
    })
    .get("/user",async(req,res,next)=>{
        const result = await User.find();
        return res.json(result)
    })
module.exports = router;