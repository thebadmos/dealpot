const cheerio = require("cheerio");
const axios = require("axios").default;
const { numberFormat } = require("../others/numberFormat");
const { kongaCategoryQl } = require("../others/kongaGraphQl");
const { karaSearchHtml, jumiaSearchHtml } = require("../search_for_prod/index");

const accessory = async(page) => {
  const data = await [...await jumia(page), ...await konga(page), ...await kara(page), ...await pointekOnline(page)];
  return data;
}

//JUMIA

const jumia = async (page) =>{
  let data = [];
    try {
        let response = await axios.get(`https://www.jumia.com.ng/mobile-accessories/?page=${page}`);
        let $ = cheerio.load(response.data);
        data = [...jumiaSearchHtml($)];
          response = await axios.get(`https://www.jumia.com.ng/computing-accessories/page=${page}`)
          $ = cheerio.load(response.data);
            data = [...data, ...jumiaSearchHtml($)];
       
            //console.log(data)
            return data;
    } catch (error) {
        console.log(error.message);
        return data;
    }
  };

  //KONGA

const konga = async (page) => {
    try {
     const laptopAccessory = await kongaCategoryQl(5228,page);
     const desktopAccessory = await kongaCategoryQl(5296,page);
     let laptopJson = await laptopAccessory.json();
     let desktopJson = await desktopAccessory.json();
     
     const data = laptopJson.data.searchByStore.products.concat(desktopJson.data.searchByStore.products).map(product=>{
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

  const kara = async (page) =>{
    let data = [];
      try {
          let response = await axios.get(`https://www.kara.com.ng/accessories-1144/?p=${page}`)
          let $ = cheerio.load(response.data);
              data = [...karaSearchHtml($)];
          response = await axios.get(`https://www.kara.com.ng/phones-and-tablets/phones-and-tablets-accessories/?p=${page}`)
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
//PONTEK ONLINE

const pointekOnline = async (page) =>{
    let data = [];
      try {
          let response = await axios.get(`https://www.pointekonline.com/accessories-lagos-nigeria/page/${page}`)
          let $ = cheerio.load(response.data);
          $("li.type-product").each((i,el)=>{
            //console.log(i)
            if($(el).find("div.product-body > a > h2").text().length > 2){
              const obj = {
                vendor:"Pointek online",
                itemTitle :  $(el).find("div.product-body > a > h2").text(),
                imgUrl: $(el).find("div.product-header > p > a > img").attr("src"),
                itemPrice: $(el).find("div.product-body > p > a > span > span").text(),
                url: $(el).find("div.product-header > a").attr("href"),
            }
            data.push(obj);
            }
        });
              //console.log(data)
              //console.log(data.length)
              return data;
      } catch (error) {
          console.log(error.message);
          return [];
      }
    }
  
  module.exports = accessory;