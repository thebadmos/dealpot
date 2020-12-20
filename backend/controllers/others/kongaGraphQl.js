const fetch = require("node-fetch");

const searchFeature = async(search) =>{
    try {
        return await fetch("https://api.konga.com/v1/graphql", {
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
        "body": `{\"query\":\"{\\n            searchByStore (search_term: [], numericFilters: [], sortBy: \\\"\\\", query: \\\"${search}\\\", paginate: {page: 0, limit: 35}, store_id: 1) {\\n                    pagination {limit,page,total},products {brand,deal_price,description,final_price,image_thumbnail,image_thumbnail_path,image_full,images,name,objectID,original_price,product_id,product_type,price,status,special_price,sku,url_key,weight,categories {id,name,url_key,position},variants {attributes {id,code,label,options {id,code,value}}},visibility,new_from_date,new_to_date,konga_fulfilment_type,is_free_shipping,is_pay_on_delivery,seller {id,name,url,is_premium,is_konga},stock {in_stock,quantity,quantity_sold,min_sale_qty,max_sale_qty},product_rating {quality {one_star,two_star,three_star,four_star,five_star,average,percentage,number_of_ratings},communication {one_star,two_star,three_star,four_star,five_star,average,percentage,number_of_ratings},delivery_percentage,delivered_orders,total_ratings},express_delivery,special_from_date,special_to_date,max_return_period,delivery_days,pay_on_delivery {country {code,name},city {id,name},area {id,name}}}\\n                }\\n            }\\n        \"}`,
        "method": "POST",
        "mode": "cors"
      });   
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

const categoryFeature = async(id) => {
    try {
        return await fetch("https://api.konga.com/v1/graphql", {
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
        "body": `{\"query\":\"{\\n            searchByStore (search_term: [[\\\"category.category_id:${id}\\\"]], numericFilters: [], sortBy: \\\"\\\", paginate: {page: 0, limit: 40}, store_id: 1) {\\n                    pagination {limit,page,total},products {brand,deal_price,description,final_price,image_thumbnail,image_thumbnail_path,image_full,images,name,objectID,original_price,product_id,product_type,price,status,special_price,sku,url_key,weight,categories {id,name,url_key,position},variants {attributes {id,code,label,options {id,code,value}}},visibility,new_from_date,new_to_date,konga_fulfilment_type,is_free_shipping,is_pay_on_delivery,seller {id,name,url,is_premium,is_konga},stock {in_stock,quantity,quantity_sold,min_sale_qty,max_sale_qty},product_rating {quality {one_star,two_star,three_star,four_star,five_star,average,percentage,number_of_ratings},communication {one_star,two_star,three_star,four_star,five_star,average,percentage,number_of_ratings},delivery_percentage,delivered_orders,total_ratings},express_delivery,special_from_date,special_to_date,max_return_period,delivery_days,pay_on_delivery {country {code,name},city {id,name},area {id,name}}}\\n                }\\n            }\\n        \"}`,
        "method": "POST",
        "mode": "cors"
      });    
    } catch (error) {
        console.log(error.message);
        return [];
    }
    
}

const findProdFeature = async(sku) => {
    return await fetch("https://api.konga.com/v1/graphql", {
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
        "body": `{\"query\":\"{ \\n    product(product_id: ${sku}) {\\n        sku\\n        name\\n        product_type\\n        status\\n        price\\n        deal_price\\n        special_price\\n        original_price\\n        final_price\\n        url_key\\n        visibility\\n        new_from_date\\n        new_to_date\\n        konga_fulfilment_type\\n        has_after_sales_service\\n        is_free_shipping\\n        is_pay_on_delivery\\n        pickup\\n        express_delivery\\n        max_return_period\\n        warranty {\\n            period\\n            text\\n            has_warranty\\n        }\\n        seller {\\n            id\\n            name\\n            banner\\n            url\\n            is_premium\\n            is_konga\\n            city\\n            state\\n            country\\n            phone_number\\n            email\\n        }\\n        variants {\\n            attributes {\\n                id\\n                code\\n                label\\n                options {\\n                    code\\n                    id\\n                    value\\n                }\\n            }\\n            products {\\n                sku\\n                price\\n                special_price\\n                qty\\n                image_thumbnail_path\\n                image_path\\n                in_stock\\n                backorders\\n                options {\\n                   code\\n                   id\\n                   value\\n                }\\n            }\\n        }\\n        stock {\\n            in_stock\\n            quantity\\n            quantity_sold\\n            min_sale_qty\\n            max_sale_qty\\n            backorders\\n        },\\n        categories {\\n            id\\n            name\\n            url_key\\n            position\\n        },\\n        product_rating {\\n            quality {\\n                one_star\\n                two_star\\n                three_star\\n                four_star\\n                five_star\\n                average\\n                percentage\\n                number_of_ratings\\n            }\\n            communication {\\n                one_star\\n                two_star\\n                three_star\\n                four_star\\n                five_star\\n                average\\n                percentage\\n                number_of_ratings\\n            }\\n            delivery_percentage\\n            delivered_orders\\n            total_ratings\\n        },\\n       product_reviews {\\n           merchant_id\\n           quality_rating\\n           communication_rating\\n           customer_id\\n           customer_name\\n           comment\\n           created_at\\n           status\\n           rating_id\\n           source\\n       },\\n       frontend_attribute_groups{\\n           frontend_attributes{\\n               attribute_label\\n               attribute_value\\n           }\\n           group_name\\n           group_id\\n       },\\n       allow_installment,\\n       warehouse_location_regions{\\n           availability_locations\\n       },\\n       custom_options{\\n            product_id\\n            values{\\n                sku,\\n                price,\\n                default_price,\\n                store_price\\n                option_id,\\n                option_type_id,\\n                title,\\n                store_title\\n            }\\n        }\\n    }\\n\\n              states(country: \\\"NG\\\") {\\n                data {\\n                  id\\n                  name\\n                }\\n              }\\n             }\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
      });
}

module.exports = {kongaSearchQl:searchFeature,kongaCategoryQl:categoryFeature,kongaFindQl:findProdFeature};