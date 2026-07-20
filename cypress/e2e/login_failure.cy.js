import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import { EXPECTED_TEXTS } from "../constants/messages";

describe("Automation Exercise - Negative Login Test", () => {
  let testData;

  before(() => {
    // Load static fixture data
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  it("should fail to login with incorrect email and password and verify the error message", () => {
    // 1. Navigate to Home Page
    cy.log("Step 1: Navigating to Home Page and verifying visibility");
    HomePage.navigateToHome();
    HomePage.verifyHomePageVisible();

    // 2. Click on 'Signup / Login' button
    cy.log("Step 2: Clicking Signup/Login button and verifying page load");
    HomePage.clickSignupLogin();
    AuthPage.verifySignupHeader(EXPECTED_TEXTS.signupHeader);

    // 3. Fill incorrect credentials and submit login
    cy.log("Step 3: Submitting login form with invalid credentials");
    AuthPage.fillLoginDetails(testData.invalidUser.email, testData.invalidUser.password);
    AuthPage.clickLogin();

    // 4. Verify correct error message is displayed
    cy.log("Step 4: Verifying the error message text");
    AuthPage.verifyLoginError(EXPECTED_TEXTS.loginError);
  });
});
