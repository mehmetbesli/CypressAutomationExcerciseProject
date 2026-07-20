import BasePage from "./BasePage";

class CheckoutPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      deliveryAddress: "#address_delivery",
      billingAddress: "#address_invoice",
      commentTextArea: "textarea[name='message']",
      placeOrderBtn: "a[href='/payment']"
    };
  }

  verifyDeliveryAddressContains(expectedValue) {
    this.verifyText(this.selectors.deliveryAddress, expectedValue);
  }

  verifyBillingAddressContains(expectedValue) {
    this.verifyText(this.selectors.billingAddress, expectedValue);
  }

  enterComment(comment) {
    this.type(this.selectors.commentTextArea, comment);
  }

  clickPlaceOrder() {
    this.click(this.selectors.placeOrderBtn);
  }
}

export default new CheckoutPage();
