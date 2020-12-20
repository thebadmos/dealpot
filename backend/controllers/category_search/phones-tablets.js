const cheerio = require("cheerio");
const axios = require("axios").default;
const { numberFormat } = require("../others/numberFormat");
const { kongaCategoryQl } = require("../others/kongaGraphQl");
const { karaSearchHtml, pointekSearchHtml, jumiaSearchHtml } = require("../search_for_prod/index");

const phonesTablets = async() => {
  const data = await [...await jumia(), ...await konga(), ...await kara(), ...await pointekOnline()];
  return data;
}

//JUMIA

const jumia = async () =>{
  let data = [];
    try {
        let response = await axios.get("https://www.jumia.com.ng/mobile-phones/");
        let $ = cheerio.load(response.data);
        data = [...jumiaSearchHtml($)];
          response = await axios.get("https://www.jumia.com.ng/tablets/")
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

const konga = async () => {
    try {
     const result = await kongaCategoryQl(5297);
     const result2 = await kongaCategoryQl(5298);
     let resultJson = await result.json();
     let resultJson2 = await result2.json();
     
     const data = resultJson.data.searchByStore.products.concat(resultJson2.data.searchByStore.products).map(product=>{
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
          let response = await axios.get("https://kara.com.ng/phones-and-tablets?product_list_order=position&product_list_dir=asc")
          let $ = cheerio.load(response.data);
              data = [...karaSearchHtml($)];
          response = await axios.get("https://kara.com.ng/phones-and-tablets?p=2&product_list_dir=asc&product_list_order=position")
          $ = cheerio.load(response.data);
             data = [...data, ...karaSearchHtml($)];
          response = await axios.get("https://kara.com.ng/phones-and-tablets?p=3&product_list_dir=asc&product_list_order=position")
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

const pointekOnline = async (search) =>{
    let data = [];
      try {
          let response = await axios.get("https://www.pointekonline.com/product-category/mobile-phones/")
          let $ = cheerio.load(response.data);
            data = [...pointekSearchHtml($)];
          response = await axios.get("https://www.pointekonline.com/product-category/tablets/")
          $ = cheerio.load(response.data);
            data = [...data, ...pointekSearchHtml($)];
          
          
              //console.log(data)
              //console.log(data.length)
              return data;
      } catch (error) {
          console.log(error.message);
          return data;
      }
    }
  
  

  module.exports = phonesTablets;