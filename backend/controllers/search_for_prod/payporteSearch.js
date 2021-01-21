const cheerio = require("cheerio");
const axios = require("axios").default;

//PAY PORTE

const payporte = async (search,page) =>{
    page = page == 1 ? 0 : page;
    let data = [];
    try {
        let response = await axios.get(`https://payporte.com/catalogsearch/result/index/?p=${page + 1}&q=${search}`)
        let $ = cheerio.load(response.data);
            data = [...searchHtml($)];

        response = await axios.get(`https://payporte.com/catalogsearch/result/index/?p=${page + 2}&q=${search}`)
        $ = cheerio.load(response.data);
            data = [...data, ...searchHtml($)];
       
            // console.log(data)
            // console.log(data.length)
            return data;
    } catch (error) {
        console.log(error.message);
        return data;
    }
}
//payporte()

const searchHtml = ($) =>{
    let data = [];
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
    return data;
}

module.exports = {payporte,payporteSearchHtml:searchHtml};