const puppeteer = require('puppeteer');
const cheerio = require("cheerio");
const axios = require("axios").default;
const { numberFormat } = require("../others/numberFormat");
const { kongaCategoryQl } = require("../others/kongaGraphQl");

const edible = async() => {
  const data = await [...await jumia(), ...await konga()];
  return data;
}

//JUMIA

const jumia = async () =>{
  const data = [];
    try {
     
        // const response = await superagent.get("https://www.jumia.com.ng/groceries/");
        // let $ = cheerio.load(response.data);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.jumia.com.ng/groceries/');
       
        // Get the "viewport" of the page, as reported by the page.
        const dimensions = await page.evaluate(() => {
          return {
            width: document.body.innerHTML
          };
        });
       
        console.log('Dimensions:', dimensions);
       
        await browser.close();
        // console.log(response);
       let $ = cheerio.load(dimensions.width);
       
      //  let $ = cheerio.load("<h1>Hello</h1>");
        // Process html like you would with jQuery...
        $(".c-prd").each((i,el)=>{
          //console.log(i)
          if($(el).find(".info .name").text().length > 3){
            const obj = {
              vendor:"Jumia",
              itemTitle:$(el).find(".info .name").text(),
              imgUrl:$(el).find(".img-c .img").attr("data-src"),
              itemPrice:$(el).find(".info .prc").text(),
              url:`https://www.jumia.com.ng${$(el).find(".core").attr("href")}`,
          }
          data.push(obj);
          }
      });
      return data;

            //console.log(data)
            
    } catch (error) {
        console.log(error.message);
        return [];
    }
  };

//KONGA

const konga = async () => {
    try {
     const result = await kongaCategoryQl(581);
     const resultJson = await result.json();
     const data = resultJson.data.searchByStore.products.map(product=>{
         return {
                   vendor:"Konga",
                   itemTitle :  product.name,
                   imgUrl: `https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product${product.image_thumbnail}`,
                   itemPrice: numberFormat(product.special_price || product.price),
                   url: `https://www.konga.com/product/${product.url_key}`,
                   sku: product.sku
         }
     });
     return data;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }
  
  module.exports = edible;