const { expect } = require("chai");
const dataset = require("../dataset");
const store = require("../config");
const { scanItem } = require("../checkout");

describe("checkout", () => {
  store.set({ dataset });
  beforeEach(() => {
    const checkout = {};
    for (const code in dataset.items) {
      checkout[code] = {};
      checkout[code].count = 0;
      checkout[code].subtotal = 0;
    }
    store.set({ checkout });
  });
  it("scanItem", () => {
    scanItem("A");
    let actual = store.get("checkout").A.count;
    expect(actual).to.equal(1);
  });
});
