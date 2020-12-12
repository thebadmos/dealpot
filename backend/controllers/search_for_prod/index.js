const jumia = require("./jumiaSearch");
const kara = require("./karaSearch");
const konga = require("./kongaSearch");
const payPorte = require("./payporteSearch");
const pointekOnline = require("./pointekonlineSearch");


const searchVendors = async (searchTerm) => {
    const data = await [...await jumia(searchTerm), ...await kara(searchTerm), ...await payPorte(searchTerm), ...await pointekOnline(searchTerm), ...await konga(searchTerm)];
    return data;
}

module.exports = searchVendors;