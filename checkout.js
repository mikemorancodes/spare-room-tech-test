const dataset = require("./dataset");
const store = require("./config");

const scanItem = itemCode => {
  const checkout = store.get("checkout");
  checkout[itemCode].count++;

  store.set("checkout", checkout);
  updateItemSubtotal(itemCode, checkout);
};

const updateItemSubtotal = (itemCode, checkout) => {};

module.exports = { scanItem };
