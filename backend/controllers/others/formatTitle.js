module.exports.formatTitle = (result) => {
    return result.map(prod=>{
        if(prod.title.length > 30){
            prod.title = `${prod.title.substring(0,30)}...`;
        }
        return prod;
    })
};
