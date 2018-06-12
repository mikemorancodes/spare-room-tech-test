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
  describe("scanItem", () => {
    it("handles invalid inputs", () => {
      expect(scanItem(1)).to.equal("invalid input");
      expect(scanItem("Z")).to.equal("invalid input");
      expect(scanItem("a")).to.equal("invalid input");
    });
    it("increments item counts on scan", () => {
      scanItem("A");
      let ACount = store.get("checkout").items.A.count;
      expect(ACount).to.equal(1);
      scanItem("A");
      ACount = store.get("checkout").items.A.count;
      expect(ACount).to.equal(2);
    });
  });
  describe("updateItemSubtotal", () => {
    it("adds up items without special prices", () => {
      for (let i = 0; i < 3; i++) scanItem("D");
      const currCheckout = store.get("checkout").items;
      const DSub = currCheckout.D.subtotal;
      expect(DSub).to.equal(36);
    });
    it("adds up items with special prices", () => {
      for (let i = 0; i < 5; i++) scanItem("B");
      const currCheckout = store.get("checkout").items;
      const BSub = currCheckout.B.subtotal;
      expect(BSub).to.equal(155);
    });
  });
  describe("updateSubtotal", () => {
    it("creates new overall subtotal", () => {
      for (let i = 0; i < 5; i++) scanItem("A");
      for (let i = 0; i < 7; i++) scanItem("B");
      for (let i = 0; i < 2; i++) scanItem("C");
      for (let i = 0; i < 4; i++) scanItem("D");
      const subtotal = store.get("checkout").subtotal;
      expect(subtotal).to.equal(553);
    });
  });
});
