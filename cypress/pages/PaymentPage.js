import BasePage from "./BasePage";

class PaymentPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      nameOnCardInput: "[data-qa='name-on-card']",
      cardNumberInput: "[data-qa='card-number']",
      cvcInput: "[data-qa='cvc']",
      expiryMonthInput: "[data-qa='expiry-month']",
      expiryYearInput: "[data-qa='expiry-year']",
      payBtn: "[data-qa='pay-button']",
      orderPlacedHeader: "[data-qa='order-placed'] b",
      continueBtn: "[data-qa='continue-button']"
    };
  }

  fillPaymentDetails(paymentDetails) {
    this.type(this.selectors.nameOnCardInput, paymentDetails.nameOnCard);
    this.type(this.selectors.cardNumberInput, paymentDetails.cardNumber);
    this.type(this.selectors.cvcInput, paymentDetails.cvc);
    this.type(this.selectors.expiryMonthInput, paymentDetails.expiryMonth);
    this.type(this.selectors.expiryYearInput, paymentDetails.expiryYear);
  }

  clickPayAndConfirmOrder() {
    this.click(this.selectors.payBtn);
  }

  verifyOrderPlaced(expectedText) {
    this.verifyText(this.selectors.orderPlacedHeader, expectedText);
  }

  clickContinue() {
    this.click(this.selectors.continueBtn);
  }
}

export default new PaymentPage();
