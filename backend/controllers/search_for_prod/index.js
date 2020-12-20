const {jumia, jumiaSearchHtml} = require("./jumiaSearch");
const {kara, karaSearchHtml} = require("./karaSearch");
const konga = require("./kongaSearch");
const {payporte, payporteSearchHtml} = require("./payporteSearch");
const {pointekOnline, pointekSearchHtml} = require("./pointekonlineSearch");
const testWeb = require("./testWesite");

/*,*/ 

const searchVendors = async (searchTerm) => {
    const data = await [...await testWeb(), ...await jumia(searchTerm), ...await kara(searchTerm), ...await payporte(searchTerm), ...await pointekOnline(searchTerm), ...await konga(searchTerm)];
    return data;
}

module.exports = {searchVendors,karaSearchHtml,payporteSearchHtml,pointekSearchHtml,jumiaSearchHtml};