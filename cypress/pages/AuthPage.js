import BasePage from "./BasePage";

class AuthPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      // Signup (Initial step)
      signupHeader: ".signup-form h2",
      signupNameInput: "[data-qa='signup-name']",
      signupEmailInput: "[data-qa='signup-email']",
      signupBtn: "[data-qa='signup-button']",

      // Detailed Registration (ID prioritised)
      accountInfoHeader: ".login-form h2 b", // "ENTER ACCOUNT INFORMATION"
      genderMrRadio: "#id_gender1",
      genderMrsRadio: "#id_gender2",
      passwordInput: "#password",
      daysSelect: "#days",
      monthsSelect: "#months",
      yearsSelect: "#years",
      newsletterCheckbox: "#newsletter",
      optinCheckbox: "#optin",
      
      firstNameInput: "#first_name",
      lastNameInput: "#last_name",
      companyInput: "#company",
      address1Input: "#address1",
      address2Input: "#address2",
      countrySelect: "#country",
      stateInput: "#state",
      cityInput: "#city",
      zipcodeInput: "#zipcode",
      mobileNumberInput: "#mobile_number",
      createAccountBtn: "[data-qa='create-account']",

      // Confirmation pages
      accountCreatedHeader: "[data-qa='account-created'] b",
      continueBtn: "[data-qa='continue-button']",
      accountDeletedHeader: "[data-qa='account-deleted'] b",

      // Login form selectors
      loginEmailInput: "[data-qa='login-email']",
      loginPasswordInput: "[data-qa='login-password']",
      loginBtn: "[data-qa='login-button']",
      loginErrorMsg: ".login-form form p"
    };
  }

  verifySignupHeader(expectedText) {
    this.verifyText(this.selectors.signupHeader, expectedText);
  }

  fillInitialSignup(name, email) {
    this.type(this.selectors.signupNameInput, name);
    this.type(this.selectors.signupEmailInput, email);
    this.click(this.selectors.signupBtn);
  }

  verifyAccountInfoHeader(expectedText) {
    this.verifyText(this.selectors.accountInfoHeader, expectedText);
  }

  fillAccountDetails(details) {
    if (details.title === "Mr") {
      this.click(this.selectors.genderMrRadio);
    } else {
      this.click(this.selectors.genderMrsRadio);
    }

    this.type(this.selectors.passwordInput, details.password);
    this.select(this.selectors.daysSelect, details.birthDay);
    this.select(this.selectors.monthsSelect, details.birthMonth);
    this.select(this.selectors.yearsSelect, details.birthYear);
    
    // Check newsletter and optin
    this.check(this.selectors.newsletterCheckbox);
    this.check(this.selectors.optinCheckbox);
  }

  fillAddressDetails(details) {
    this.type(this.selectors.firstNameInput, details.firstName);
    this.type(this.selectors.lastNameInput, details.lastName);
    this.type(this.selectors.companyInput, details.company);
    this.type(this.selectors.address1Input, details.address1);
    this.type(this.selectors.address2Input, details.address2);
    this.select(this.selectors.countrySelect, details.country);
    this.type(this.selectors.stateInput, details.state);
    this.type(this.selectors.cityInput, details.city);
    this.type(this.selectors.zipcodeInput, details.zipcode);
    this.type(this.selectors.mobileNumberInput, details.mobileNumber);
  }

  clickCreateAccount() {
    this.click(this.selectors.createAccountBtn);
  }

  verifyAccountCreated(expectedText) {
    this.verifyText(this.selectors.accountCreatedHeader, expectedText);
  }

  clickContinue() {
    this.click(this.selectors.continueBtn);
  }

  verifyAccountDeleted(expectedText) {
    this.verifyText(this.selectors.accountDeletedHeader, expectedText);
  }

  fillLoginDetails(email, password) {
    this.type(this.selectors.loginEmailInput, email);
    this.type(this.selectors.loginPasswordInput, password);
  }

  clickLogin() {
    this.click(this.selectors.loginBtn);
  }

  verifyLoginError(expectedText) {
    this.verifyText(this.selectors.loginErrorMsg, expectedText);
  }
}

export default new AuthPage();
