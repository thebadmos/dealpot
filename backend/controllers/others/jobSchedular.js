const CronJob = require("cron").CronJob;
const axios = require("axios").default;
const cheerio = require("cheerio");
const { User } = require("../../models");
const { NotifyUser } = require("../../models");


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
        console.log("Schedular ran");
    }
}


const job = new CronJob({
    cronTime: "00 30 20 17 11 *",
    onTick: notification,
    onComplete: function(){console.log("done")},
    timeZone:"Africa/Lagos"
});
console.log(job.nextDate());
job.start();
console.log(job.nextDate());


const TestwebNotify = async(product) => {
    try {
       let response = await axios.get(`${product.url}`)
       let $ = cheerio.load(response.data);
                  let obj = {
                    vendor:"Testweb",
                    itemPrice: $(".detail").find("p").first().text()
                };
        let isPriceUpdated = obj.itemPrice != product.price;
            if(isPriceUpdated){
                product.priceHistory.push(product.price);
                // await product.save();
                product.notifyUsers.forEach(async user=>{
                    const notifyUser = await User.findById(user);
                    const updateProduct = {message:`A product amongst your saved items from ${product.vendor} has changed in price from ${product.price} to ${obj.itemPrice}`,img:product.imgUrl}
                    notifyUser.notifications.push(updateProduct);
                    notifyUser.numbOfNotification += 1;
                    const findIdx = notifyUser.savedItems.findIndex(item=>item.url == product.url);
                    if(findIdx > -1) {
                        notifyUser.savedItems[findIdx].priceHistory.push(product.price); 
                        notifyUser.savedItems[findIdx].price = obj.itemPrice;
                    }
                    await notifyUser.save();
                    console.log(notifyUser);
                    console.log("notifyUser");
                })
                await NotifyUser.findByIdAndUpdate(product._id,{$set:{price:obj.itemPrice}});
                console.log(product)
                
            }else{
                console.log("Schedule ran but nothing to update")
            }
    } catch (error) {
        console.log(error);
    }
}
const payPorteNotify = async(product) => {
    console.log("Payporte schedular")
}
const pointekOnlineNotify = async(product) => {
    console.log("Pointek ONline schedular")
}
const karaNotify = async(product) => {
    console.log("Kara schedular")
}
const kongaNotify = async(product) => {
    console.log("Konga schedular")
}


/*
const payporte = async (search) =>{
    try {
        const data = [];
        let response = await axios.get("https://payporte.com/button-trim-ribbed-crop-top-set.html")
        let $ = cheerio.load(response.data);
                  let obj = {
                    vendor:"Payporte",
                    itemPrice: $("span").find(".price").first().text()
                };
                data.push(obj);
        response = await axios.get("https://www.jumia.com.ng/samsung-wireless-bluetooth-earbuds-64156702.html")
        $ = cheerio.load(response.data);
                  obj = {
                    vendor:"Jumia",
                    itemPrice: $("#jm").find("span.-tal").first().text()
                };
                data.push(obj);
        response = await axios.get("https://kara.com.ng/apple-iphone-x-3gb-256gb")
        $ = cheerio.load(response.data);
                  obj = {
                    vendor:"Kara",
                    itemPrice: $("span").find(".price").first().text()
                };
                data.push(obj);
        response = await axios.get("https://www.pointekonline.com/product/awei-g10bl-wireless-bluetooth/")
        $ = cheerio.load(response.data);
                  obj = {
                    vendor:"Pointek",
                    itemPrice: $("div.single-product-inner").find("div.summary.entry-summary > div > div.single-product-info > div.price-details > p span.amount").first().text()
                };
                data.push(obj);
        // response = await axios.get("https://www.konga.com/product/fantastic-perfurm-50ml-4468770")
        // $ = cheerio.load(response.data);
        //           obj = {
        //             vendor:"Konga",
        //             itemPrice: $("#mainContent").find("form > div._3924b_1USC3._16f96_38E1t > div._3924b_1USC3 > div").first().text()
        //         };
        //         data.push(obj);
            

            // console.log(data)
            // console.log(data.length)
            return data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

payporte()
    .then(data=>console.log(data))
    .catch(err=>console.log("Something broke",err.message))
*/


// console.log(notification());