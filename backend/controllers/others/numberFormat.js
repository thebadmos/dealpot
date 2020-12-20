exports.numberFormat = (amount) => {
 return new Intl.NumberFormat("en-US",
                        { style: "currency", currency: "NGN",
                          minimumFractionDigits: 2 })
                          .format(amount)
                          .replace("NGN","₦");
}