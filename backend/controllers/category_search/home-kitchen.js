const cheerio = require("cheerio");
const axios = require("axios").default;
const { numberFormat } = require("../others/numberFormat");
const { kongaCategoryQl } = require("../others/kongaGraphQl");
const { karaSearchHtml } = require("../search_for_prod/index");

const homeKitchen = async() => {
  const data = await [...await jumia(), ...await konga(), ...await kara()];
  return data;
}

//JUMIA

const jumia = async () =>{
  const data = [];
    try {
        const response = await axios.get("https://www.jumia.com.ng/home-office/");
        let $ = cheerio.load(response.data);
        
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
            //console.log(data)
            return data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
  };

//KONGA

const konga = async () => {
    try {
     const result = await kongaCategoryQl(602);
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

  const kara = async () =>{
    let data = [];
      try {
          let response = await axios.get("https://kara.com.ng/home-kitchen")
          let $ = cheerio.load(response.data);
              data = [...karaSearchHtml($)];
          response = await axios.get("https://kara.com.ng/home-kitchen/?p=2")
          $ = cheerio.load(response.data);
             data = [...data, ...karaSearchHtml($)];
          response = await axios.get("https://kara.com.ng/home-kitchen/?p=3")
          $ = cheerio.load(response.data);
             data = [...data, ...karaSearchHtml($)];
              // console.log(data)
              // console.log(data.length)
              return data;
      } catch (error) {
          console.log(error.message)
          return data;
      }
    }
  

  module.exports = homeKitchen;