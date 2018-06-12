const { expect } = require("chai");
const dataset = require("../dataset");
const store = require("../config");
const { scanItem } = require("../checkout");

describe("checkout", () => {
  store.set({ dataset });
  beforeEach(() => {
    const checkout = { items: {}, subtotal: 0 };
    for (const code in dataset.items) {
      const ref = checkout.items;
      ref[code] = {};
      ref[code].count = 0;
      ref[code].subtotal = 0;
    }
    store.set({ checkout });
  });
  it("scanItem", () => {
    scanItem("A");
    let ACount = store.get("checkout").items.A.count;
    expect(ACount).to.equal(1);
    scanItem("A");
    ACount = store.get("checkout").items.A.count;
    expect(ACount).to.equal(2);
  });
  it("updateItemSubtotal", () => {
    for (let i = 0; i < 3; i++) scanItem("D");
    for (let i = 0; i < 5; i++) scanItem("B");
    const currCheckout = store.get("checkout").items;
    const DSub = currCheckout.D.subtotal;
    expect(DSub).to.equal(36);
    const BSub = currCheckout.B.subtotal;
    expect(BSub).to.equal(155);
  });
  it("updateSubtotal", () => {
    for (let i = 0; i < 5; i++) scanItem("A");
    for (let i = 0; i < 7; i++) scanItem("B");
    for (let i = 0; i < 2; i++) scanItem("C");
    for (let i = 0; i < 4; i++) scanItem("D");
    const subtotal = store.get("checkout").subtotal;
    expect(subtotal).to.equal(553);
  });
});
