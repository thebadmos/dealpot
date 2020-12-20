const { kongaSearchQl } = require("../others/kongaGraphQl");
const { numberFormat } = require("../others/numberFormat");

//KONGA

const konga = async (search) => {
   try {
    const result = await kongaSearchQl(search);
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

module.exports = konga;


//#mainContent > div > div.d9549_IlL3h > div._8f9c3_230YI._47f1e_1dZrT > div._680e2_KPkEz > div > form > div._3924b_1USC3._16f96_38E1t > div._3924b_1USC3 > div
//#mainContent form > div._3924b_1USC3._16f96_38E1t > div._3924b_1USC3 > div