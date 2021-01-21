const cheerio = require("cheerio");
const axios = require("axios").default;
const { numberFormat } = require("../others/numberFormat");
const { kongaCategoryQl } = require("../others/kongaGraphQl");

const gaming = async(page) => {
  const data = await [...await jumia(page), ...await konga(page), ...await pointekOnline(page)];
  return data;
}

//JUMIA

const jumia = async (page) =>{
  const data = [];
    try {
        const response = await axios.get(`https://www.jumia.com.ng/video-games/?page=${page}`);
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

const konga = async (page) => {
    try {
     const result = await kongaCategoryQl(1683,page);
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

      //PONTEK ONLINE

const pointekOnline = async (page) =>{
    let data = [];
      try {
          let response = await axios.get(`https://www.pointekonline.com/product-category/games-consoles/page/${page}`)
          let $ = cheerio.load(response.data);
          $("li.type-product").each((i,el)=>{
            //console.log(i)
            if($(el).find("div.product-body > a > h2").text().length > 2){
              const obj = {
                vendor:"Pointek online",
                itemTitle :  $(el).find("div.product-body > a > h2").text(),
                imgUrl: $(el).find("div.product-header > a > img").attr("src"),
                itemPrice: $(el).find("div.product-body > a > span > span").text(),
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

module.exports = gaming;