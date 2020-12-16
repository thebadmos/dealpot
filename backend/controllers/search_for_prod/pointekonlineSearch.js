const cheerio = require("cheerio");
const axios = require("axios").default;

//PONTEK ONLINE

const pointekOnline = async (search) =>{
    try {
        const data = [];
        const response = await axios.get(`https://www.pointekonline.com/?s=${search}&post_type=product`)
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
        console.log(error)
        return [];
    }
  }
  //pointekOnline()

  module.exports = pointekOnline;



  //div.single-product-inner > div.summary.entry-summary > div > div.single-product-info > div.price-details > p  span.amount