const dataset = require("./dataset");
const Store = require("data-store");
const store = new Store("subtotal");

//store.set("item", 50);

store.del("item");

console.log(store.data);
