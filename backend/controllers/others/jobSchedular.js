const CronJob = require("cron").CronJob;
const axios = require("axios").default;
const cheerio = require("cheerio");
const { User } = require("../../models");
const { NotifyUser } = require("../../models");
const { kongaFindQl } = require("../others/kongaGraphQl");
const { numberFormat } = require("./numberFormat");


const notification  = async() =>{
    const notifyProducts = await NotifyUser.find();
    if(notifyProducts.length){
        // console.log(notifyProducts);
        notifyProducts.forEach(product=>{
            if(product.vendor == "Jumia"){
                jumiaNotify(product);
            }else if(product.vendor == "Payporte"){
                payPorteNotify(product);
            }else if(product.vendor == "Pointek online"){
                pointekOnlineNotify(product);
            }else if(product.vendor == "Kara"){
                karaNotify(product);
            }else if(product.vendor == "Konga"){
                kongaNotify(product);
            }else if(product.vendor == "Testweb"){
                TestwebNotify(product);
            }
        })
    }else{
        console.log("Schedular ran but no product to watch");
    }
}


const job = new CronJob({
    cronTime: "00 */5 * * * *",
    onTick: notification,
    onComplete: function(){console.log("Scheduling done")},
    timeZone:"Africa/Lagos"
});
console.log(job.nextDate());
job.start();
console.log(job.nextDate());


const TestwebNotify = async(product) => {
    try {
       let response = await axios.get(`${product.url}`)
       let $ = cheerio.load(response.data);
                  let currentProd = {
                    vendor:"Testweb",
                    itemPrice: $(".detail").find("p").first().text()
                };
           await compareProduct(product,currentProd);
    } catch (error) {
        console.log(error);
    }
}
const jumiaNotify = async(product)=>{
    try {
        let response = await axios.get(`${product.url}`)
        let $ = cheerio.load(response.data);
                   let currentProd = {
                     vendor:"Jumia",
                     itemPrice: $("#jm").find("span.-tal").first().text()
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}
const payPorteNotify = async(product) => {
    try {
        let response = await axios.get(`${product.url}`)
        let $ = cheerio.load(response.data);
                   let currentProd = {
                     vendor:"Payporte",
                     itemPrice: $("span").find(".price").first().text()
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}
const pointekOnlineNotify = async(product) => {
    try {
        let response = await axios.get(`${product.url}`)
        let $ = cheerio.load(response.data);
                   let currentProd = {
                     vendor:"Pointek online",
                     itemPrice: $("div.single-product-inner").find("div.summary.entry-summary > div > div.single-product-info > div.price-details > p span.amount").first().text()
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}
const karaNotify = async(product) => {
    try {
        let response = await axios.get(`${product.url}`)
        let $ = cheerio.load(response.data);
                   let currentProd = {
                     vendor:"Kara",
                     itemPrice: $("span").find(".price").first().text()
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}
const kongaNotify = async(product) => {
    try {
        const result = await kongaFindQl(product.sku);
      const resultJson = await result.json();
                   let currentProd = {
                     vendor:"Konga",
                     itemPrice: numberFormat(resultJson.data.product.special_price || resultJson.data.product.price)
                 };
            await compareProduct(product,currentProd);
     } catch (error) {
         console.log(error);
     }
}


const compareProduct = async(prev,current) => {
    let isPriceUpdated = current.itemPrice != prev.price;
    if(isPriceUpdated){
        prev.priceHistory.push(prev.price);
        // await product.save();
        prev.notifyUsers.forEach(async user=>{
            const notifyUser = await User.findById(user);
            const updateProduct = {message:`A product amongst your saved items from ${prev.vendor} has changed in price from ${prev.price} to ${current.itemPrice}`,img:prev.imgUrl}
            notifyUser.notifications.unshift(updateProduct);
            notifyUser.numbOfNotification += 1;
            const findIdx = notifyUser.savedItems.findIndex(item=>item.url == prev.url);
            if(findIdx > -1) {
                notifyUser.savedItems[findIdx].priceHistory.push(prev.price); 
                notifyUser.savedItems[findIdx].price = current.itemPrice;
            }
            await notifyUser.save();
        })
        await NotifyUser.findByIdAndUpdate(prev._id,{$set:{price:current.itemPrice}});
        
    }else{
        console.log("Schedule ran but nothing to update")
    }
}
