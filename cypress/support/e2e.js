// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-mochawesome-reporter/register";

// Prevent Cypress from failing tests when uncaught application exceptions occur
// (This is common due to third-party Google AdSense scripts on automationexercise.com)
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

// Intercept and block Google Ad/Analytics networks to speed up execution
// and prevent intrusive popups/ads from blocking element clicks.
beforeEach(() => {
  // Block Google Ad services
  cy.intercept({ url: "**/pagead/js/adsbygoogle.js" }, { body: "" });
  cy.intercept({ url: "**/*.doubleclick.net/**" }, { body: "" });
  cy.intercept({ url: "**/googleads.g.doubleclick.net/**" }, { body: "" });
  cy.intercept({ url: "**/pagead2.googlesyndication.com/**" }, { body: "" });
  cy.intercept({ url: "**/adservice.google.com/**" }, { body: "" });
  cy.intercept({ url: "**/*.google-analytics.com/**" }, { body: "" });
});
