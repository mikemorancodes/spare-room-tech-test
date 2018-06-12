const dataset = require("./dataset");
const store = require("./config");

const scanItem = itemCode => {
  const isValidCode = Object.keys(dataset.items).some(key => key === itemCode);
  if (!isValidCode) return "invalid input";
  const checkout = store.get("checkout");
  checkout.items[itemCode].count++;

  updateItemSubtotal(itemCode, checkout);
};

const updateItemSubtotal = (itemCode, checkout) => {
  const { unitPrice, specialPrice } = dataset.items[itemCode];
  const itemCount = checkout.items[itemCode].count;
  let sub = 0;

  if (specialPrice) {
    const [specialCount, forStr, specialAmount] = specialPrice.split(" ");
    const dealCount = Math.floor(itemCount / +specialCount);
    sub += dealCount * +specialPrice.split(" ")[2];
    sub += (itemCount % +specialCount) * unitPrice;
  } else {
    sub += itemCount * unitPrice;
  }

  checkout.items[itemCode].subtotal = sub;
  updateSubtotal(checkout);
};

const updateSubtotal = checkout => {
  let sub = 0;
  for (const item in checkout.items) {
    sub += checkout.items[item].subtotal;
  }
  checkout.subtotal = sub;
};

module.exports = { scanItem, updateSubtotal };
