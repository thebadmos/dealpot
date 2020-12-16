const cheerio = require("cheerio");
const axios = require("axios").default;

//PAY PORTE

const payporte = async (search) =>{
    try {
        const data = [];
        const response = await axios.get(`https://payporte.com/catalogsearch/result/?q=${search}`)
        let $ = cheerio.load(response.data);
        
        $("li.product-item").each((i,el)=>{
                //console.log(i)
                if($(el).find("div > div.product.details.product-item-details > h2 > a").text().length > 2){
                  const obj = {
                    vendor:"Payporte",
                    itemTitle :  $(el).find("div > div.product.details.product-item-details > h2 > a").text(),
                    imgUrl: $(el).find("div > div.product_image > a > span > span > img").attr("data-original"),
                    itemPrice: $(el).find("span .price").text(),
                    url: `${$(el).find("div > div.product.details.product-item-details > h2 > a").attr("href")}`,
                }
                data.push(obj);
                }
            });
            // console.log(data)
            // console.log(data.length)
            return data;
    } catch (error) {
        console.log(error)
        return [];
    }
}
//payporte()

module.exports = payporte;