import BasePage from "./BasePage";

class CartPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      cartItems: "tr[id^='product-']",
      productNameInCart: ".cart_description a",
      proceedToCheckoutBtn: "a.check_out"
    };
  }

  verifyProductInCart(productName) {
    cy.get(this.selectors.cartItems).should("have.length.at.least", 1);
    this.verifyText(this.selectors.productNameInCart, productName);
  }

  clickProceedToCheckout() {
    this.click(this.selectors.proceedToCheckoutBtn);
  }
}

export default new CartPage();
