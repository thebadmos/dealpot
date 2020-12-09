const cheerio = require("cheerio");
const axios = require("axios").default;


//JUMIA

const jumia = async (search) =>{
  const data = [];
    try {
        const response = await axios.get(`https://www.jumia.com.ng/catalog/?q=${search}`)
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
        console.log(error)
    }
  }
  module.exports = jumia;
  //jumia()