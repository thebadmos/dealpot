const cheerio = require("cheerio");
const axios = require("axios").default;


const testWeb = async () =>{
  const data = [];
    try {
        const response = await axios.get("https://dealpot-test-web.netlify.app/")
        let $ = cheerio.load(response.data);
        
        $(".card").each((i,el)=>{
                //console.log(i)
                if($(el).find(".title").text().length > 3){
                  const obj = {
                    vendor:"Testweb",
                    itemTitle:$(el).find(".title").text(),
                    imgUrl:$(el).find("img").attr("src"),
                    itemPrice:$(el).find(".price").text(),
                    url:`https://dealpot-test-web.netlify.app${$(el).find("a").attr("href")}`,
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
  }
  module.exports = testWeb;
  //jumia()