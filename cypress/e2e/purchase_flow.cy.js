import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentPage from "../pages/PaymentPage";
import { EXPECTED_TEXTS } from "../constants/messages";

describe("Automation Exercise - E2E Purchase Flow", () => {
  let testData;
  let dynamicEmail;
  let dynamicUsername;

  before(() => {
    // Load static fixture data
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // Generate a dynamic email and username to ensure fresh registration every run/retry attempt.
    const uniqueSuffix = Date.now();
    dynamicEmail = `testuser_${uniqueSuffix}@example.com`;
    dynamicUsername = `${testData.user.firstName}_${uniqueSuffix}`;
  });

  it("should successfully register a user, search & add product, checkout, pay and delete account", () => {
    // 1. Navigate to Home Page
    cy.log("Step 1: Navigating to Home Page and verifying visibility");
    HomePage.navigateToHome();
    HomePage.verifyHomePageVisible();

    // 2. Click on 'Signup / Login' button
    cy.log("Step 2: Clicking Signup/Login button and verifying New User Signup header");
    HomePage.clickSignupLogin();
    AuthPage.verifySignupHeader(EXPECTED_TEXTS.signupHeader);

    // 3. Fill initial signup details and click Signup
    cy.log("Step 3: Submitting initial signup form with username and dynamic email");
    AuthPage.fillInitialSignup(dynamicUsername, dynamicEmail);
    AuthPage.verifyAccountInfoHeader(EXPECTED_TEXTS.accountInfoHeaders);

    // 4. Fill account registration details
    cy.log("Step 4: Filling account details (Title, Password, DOB, Newsletter, Optin)");
    AuthPage.fillAccountDetails(testData.user);

    // 5. Fill address details and create account
    cy.log("Step 5: Filling address/contact details and clicking Create Account");
    AuthPage.fillAddressDetails(testData.user);
    AuthPage.clickCreateAccount();

    // 6. Verify account creation
    cy.log("Step 6: Verifying Account Created success header");
    AuthPage.verifyAccountCreated(EXPECTED_TEXTS.accountCreated);

    // 7. Click Continue and verify logged in status
    cy.log("Step 7: Clicking Continue and verifying logged-in user label in navigation header");
    AuthPage.clickContinue();
    HomePage.verifyLoggedInUser(dynamicUsername);

    // 8. Go to Products Page, search for product and verify results
    cy.log("Step 8: Clicking Products page, searching for the product, and verifying search output");
    HomePage.clickProducts();
    ProductsPage.searchProduct(testData.search.productName);
    ProductsPage.verifySearchedProductsHeader(EXPECTED_TEXTS.searchedProductsHeader);
    ProductsPage.verifyProductVisible(testData.search.productName);

    // 9. Add first product to cart and click View Cart in the modal
    cy.log("Step 9: Adding the product to cart and proceeding to Cart Page");
    ProductsPage.addFirstProductToCart();
    ProductsPage.clickViewCartInModal();

    // 10. Verify product in cart and proceed to checkout
    cy.log("Step 10: Verifying product is in cart and proceeding to checkout");
    CartPage.verifyProductInCart(testData.search.productName);
    CartPage.clickProceedToCheckout();

    // 11. Verify delivery and billing addresses
    cy.log("Step 11: Verifying delivery and billing addresses contain user credentials");
    CheckoutPage.verifyDeliveryAddressContains(testData.user.firstName);
    CheckoutPage.verifyDeliveryAddressContains(testData.user.address1);
    CheckoutPage.verifyDeliveryAddressContains(testData.user.city);
    
    CheckoutPage.verifyBillingAddressContains(testData.user.firstName);
    CheckoutPage.verifyBillingAddressContains(testData.user.address1);
    CheckoutPage.verifyBillingAddressContains(testData.user.city);

    // 12. Add comments and click Place Order
    cy.log("Step 12: Adding order comments and proceeding to Payment Page");
    CheckoutPage.enterComment(testData.orderComment);
    CheckoutPage.clickPlaceOrder();

    // 13. Enter payment details and click Pay and Confirm Order
    cy.log("Step 13: Entering credit card credentials and submitting payment");
    PaymentPage.fillPaymentDetails(testData.payment);
    PaymentPage.clickPayAndConfirmOrder();

    // 14. Verify order confirmation success message
    cy.log("Step 14: Verifying Order Placed success header");
    PaymentPage.verifyOrderPlaced(EXPECTED_TEXTS.orderPlaced);
    PaymentPage.clickContinue();

    // 15. Delete Account and verify deletion
    cy.log("Step 15: Deleting Account and verifying Account Deleted success header");
    HomePage.clickDeleteAccount();
    AuthPage.verifyAccountDeleted(EXPECTED_TEXTS.accountDeleted);
    
    // 16. Click Continue to finish test case
    cy.log("Step 16: Clicking Continue to return to Home Page");
    AuthPage.clickContinue();
    HomePage.verifyHomePageVisible();
  });
});
