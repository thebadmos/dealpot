const {jumia, jumiaSearchHtml} = require("./jumiaSearch");
const {kara, karaSearchHtml} = require("./karaSearch");
const konga = require("./kongaSearch");
const {payporte, payporteSearchHtml} = require("./payporteSearch");
const {pointekOnline, pointekSearchHtml} = require("./pointekonlineSearch");
const testWeb = require("./testWesite");

/*,*/ 

const searchVendors = async (searchTerm,page) => {
    const data = await [...await testWeb(), ...await jumia(searchTerm,page), ...await kara(searchTerm,page), ...await payporte(searchTerm,page), ...await pointekOnline(searchTerm,page), ...await konga(searchTerm,page)];
    return data;
}

module.exports = {searchVendors,karaSearchHtml,payporteSearchHtml,pointekSearchHtml,jumiaSearchHtml};