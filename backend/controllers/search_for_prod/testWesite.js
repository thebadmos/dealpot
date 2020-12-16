const cheerio = require("cheerio");
const axios = require("axios").default;


//JUMIA

const testWeb = async () =>{
  const data = [];
    try {
        const response = await axios.get("http://127.0.0.1:5500/index.html")
        let $ = cheerio.load(response.data);
        
        $(".card").each((i,el)=>{
                //console.log(i)
                if($(el).find(".title").text().length > 3){
                  const obj = {
                    vendor:"Testweb",
                    itemTitle:$(el).find(".title").text(),
                    imgUrl:$(el).find("img").attr("src"),
                    itemPrice:$(el).find(".price").text(),
                    url:$(el).find("a").attr("href"),
                }
                data.push(obj);
                }
            });
            //console.log(data)
            return data;
    } catch (error) {
        console.log(error)
    }
  }
  module.exports = testWeb;
  //jumia()