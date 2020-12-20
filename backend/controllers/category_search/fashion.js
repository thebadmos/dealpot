const cheerio = require("cheerio");
const axios = require("axios").default;
const { numberFormat } = require("../others/numberFormat");
const { payporteSearchHtml } = require("../search_for_prod/index");
const { kongaCategoryQl } = require("../others/kongaGraphQl");

const fashion = async() => {
  const data = await [...await jumia(), ...await payporte(), ...await konga()];
  return data;
}

//JUMIA

const jumia = async () =>{
  const data = [];
    try {
        const response = await axios.get("https://www.jumia.com.ng/category-fashion-by-jumia/");
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

const payporte = async () =>{
  let data = [];
  try {
      let response = await axios.get("https://payporte.com/new-arrivals.html");
      let $ = cheerio.load(response.data);
          data = [...payporteSearchHtml($)];

      response = await axios.get("https://payporte.com/new-arrivals.html?p=2");
      $ = cheerio.load(response.data);
          data = [...data, ...payporteSearchHtml($)];
      response = await axios.get("https://payporte.com/new-arrivals.html?p=3");
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

const konga = async () => {
  try {
   const result = await kongaCategoryQl(1259);
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