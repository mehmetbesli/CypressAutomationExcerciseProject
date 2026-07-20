import BasePage from "./BasePage";

class HomePage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      homeLogo: ".logo img",
      signupLoginBtn: "a[href='/login']",
      productsBtn: "a[href='/products']",
      cartBtn: "a[href='/view_cart']",
      deleteAccountBtn: "a[href='/delete_account']",
      loggedInUserText: ".navbar-nav"
    };
  }

  navigateToHome() {
    this.visit("/");
  }

  verifyHomePageVisible() {
    this.verifyVisible(this.selectors.homeLogo);
  }

  clickSignupLogin() {
    this.click(this.selectors.signupLoginBtn);
  }

  clickProducts() {
    this.click(this.selectors.productsBtn);
  }

  clickCart() {
    this.click(this.selectors.cartBtn);
  }

  clickDeleteAccount() {
    this.click(this.selectors.deleteAccountBtn);
  }

  verifyLoggedInUser(username) {
    this.verifyText(this.selectors.loggedInUserText, `Logged in as ${username}`);
  }
}

export default new HomePage();
