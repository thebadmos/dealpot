const cheerio = require("cheerio");
const axios = require("axios").default;

//KARA

const kara = async (search,page) =>{
  page = page == 1 ? 0 : page; 
  let data = [];
    try {
        let response = await axios.get(`https://www.kara.com.ng/catalogsearch/result/index/?p=${page + 1}&q=${search}`)
        let $ = cheerio.load(response.data);
            data = [...searchHtml($)];
        response = await axios.get(`https://www.kara.com.ng/catalogsearch/result/index/?p=${page + 2}&q=${search}`)
        $ = cheerio.load(response.data);
           data = [...data, ...searchHtml($)];
            // console.log(data)
            // console.log(data.length)
            return data;
    } catch (error) {
        console.log(error.message)
        return data;
    }
  }
  //kara()

  const searchHtml = ($) =>{
    const data = [];
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
  return data;
  }

  module.exports = {kara,karaSearchHtml:searchHtml};
