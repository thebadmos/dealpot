const cheerio = require("cheerio");
const axios = require("axios").default;
const { numberFormat } = require("../others/numberFormat");
const { payporteSearchHtml } = require("../search_for_prod/index");
const { kongaCategoryQl } = require("../others/kongaGraphQl");

const fashion = async(page) => {
  const data = await [...await jumia(page), ...await payporte(page), ...await konga(page)];
  return data;
}

//JUMIA

const jumia = async (page) =>{
  const data = [];
    try {
        const response = await axios.get(`https://www.jumia.com.ng/category-fashion-by-jumia/?page=${page}`);
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
 

//PAY PORTE

const payporte = async (page) =>{
  let data = [];
  try {
      let response = await axios.get(`https://payporte.com/new-arrivals.html?p=${page}`);
      let $ = cheerio.load(response.data);
          data = [...payporteSearchHtml($)];
      response = await axios.get(`https://payporte.com/dresses.html?p=${page}`);
      $ = cheerio.load(response.data);
          data = [...data, ...payporteSearchHtml($)];
     
          // console.log(data)
          // console.log(data.length)
          return data;
  } catch (error) {
      console.log(error.message);
      return data;
  }
}
//payporte()

//KONGA

const konga = async (page) => {
  try {
   const result = await kongaCategoryQl(1259,page);
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

module.exports = fashion;