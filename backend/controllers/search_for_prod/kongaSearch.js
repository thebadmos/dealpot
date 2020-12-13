const fetch = require("node-fetch");
const { numberFormat } = require("../others/numberFormat");
//KONGA

const konga = async (search) => {
    const result = await fetch("https://api.konga.com/v1/graphql", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-app-source": "kongavthree",
          "x-app-version": "2.0"
        },
        "referrer": "https://www.konga.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"query\":\"{\\n            searchByStore (search_term: [], numericFilters: [], sortBy: \\\"\\\", query: \\\"${search}\\\", paginate: {page: 0, limit: 50}, store_id: 1) {\\n                    pagination {limit,page,total},products {brand,deal_price,description,final_price,image_thumbnail,image_thumbnail_path,image_full,images,name,objectID,original_price,product_id,product_type,price,status,special_price,sku,url_key,weight,categories {id,name,url_key,position},variants {attributes {id,code,label,options {id,code,value}}},visibility,new_from_date,new_to_date,konga_fulfilment_type,is_free_shipping,is_pay_on_delivery,seller {id,name,url,is_premium,is_konga},stock {in_stock,quantity,quantity_sold,min_sale_qty,max_sale_qty},product_rating {quality {one_star,two_star,three_star,four_star,five_star,average,percentage,number_of_ratings},communication {one_star,two_star,three_star,four_star,five_star,average,percentage,number_of_ratings},delivery_percentage,delivered_orders,total_ratings},express_delivery,special_from_date,special_to_date,max_return_period,delivery_days,pay_on_delivery {country {code,name},city {id,name},area {id,name}}}\\n                }\\n            }\\n        \"}`,
        "method": "POST",
        "mode": "cors"
      });
      const resultJson = await result.json();
      const data = resultJson.data.searchByStore.products.map(product=>{
          return {
                    vendor:"Konga",
                    itemTitle :  product.name,
                    imgUrl: `https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product${product.image_thumbnail}`,
                    itemPrice: numberFormat(product.special_price || product.price),
                    url: `https://www.konga.com/product/${product.url_key}`,
          }
      });
      return data
}

module.exports = konga;