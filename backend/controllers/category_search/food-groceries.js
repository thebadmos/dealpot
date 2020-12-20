var cloudscraper = require('cloudscraper');
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
     
         const response = await axios.get("https://www.jumia.com.ng/groceries/");
         console.log("response",response)
         console.log("responseData",response.data)
        // let $ = cheerio.load(response.data);
        var options = {
          uri: 'https://www.jumia.com.ng/groceries/'
        };
        cloudscraper(options)
        .then(function (htmlString) {
          console.log("cloud",htmlString)
        })
        .catch(function (err) {
          console.log(err.message)
        });
       
       
       let $ = cheerio.load("<h1>Hello</h1>");
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

  // 'newsletter=1; userLanguage=en_NG; _gcl_au=1.1.1723443389.1604724214; _ga=GA1.3.1316592985.1604724214; _fbp=fb.2.1604724215481.197052287; _cs_ex=1521463277; _cs_c=1; sponsoredUserId=42241284650743594515fa9118f790d5; gadsTest=test; sb-closed=true; subscriberId=7ca271dc93d3b109c035f130d9534b90; accountType=Customer; customerType=new; userId=10276433; customerUuid=48a3b733-96d3-4f72-ba40-b165fa83fd20; __cfduid=de7b3715e97762d281ff0cd494c316b521607525202; closedBanners=63; __gads=ID=4de9c891817b93a7:T=1604915603:S=ALNI_MYzAvyTZmvjbmun2253UZZ_G42Gtg; _gid=GA1.3.651008294.1608427510; SOLSESSID=067d62dffefa88533aafff6d9c5639e9; cto_bundle=GaBjwV9pTU9Fc01CUlczNjhmZWFLRmpKcjM1SkFJQ2tVZndXT1JlcThZODZCOGc3ZGlTbWMlMkJmeHdlcHZSQ0FpNVBEU1k1eHgyU0wxUSUyQnZTeUlxV0JvbkVwZkRxMElERXh5R284OW5iUHJITnZLRk9UWFJIQWcyVjk2WjI5b1RrNGExZTNHZGtKSllpTzBuaiUyRjQxT29aMThjT0ElM0QlM0Q; _gat_UA-31880622-1=1'