const cheerio = require("cheerio");
const axios = require("axios").default;

//KARA

const kara = async (search) =>{
    try {
        const data = [];
        const response = await axios.get(`https://kara.com.ng/catalogsearch/result/index/?q=${search}`)
        let $ = cheerio.load(response.data);
        $("li.product-item").each((i,el)=>{
                if($(el).find("div > div > strong > a").text().length > 2){
                  const obj = {
                    vendor:"Kara",
                    itemTitle :  $(el).find("div > div > strong > a").text(),
                    imgUrl: $(el).find("div > a > span > span > img").attr("data-original"),
                    itemPrice: $(el).find(".product-item .price-box > span:nth-child(1) .price").text(),
                    url: $(el).find("div > div > strong > a").attr("href"),
                }
                data.push(obj);
                }
            });
            // console.log(data)
            // console.log(data.length)
            return data;
    } catch (error) {
        console.log(error)
    }
  }
  //kara()

  module.exports = kara;