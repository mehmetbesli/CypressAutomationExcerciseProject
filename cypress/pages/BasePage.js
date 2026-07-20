class BasePage {
  /**
   * Visite the given relative URL path.
   * @param {string} path 
   */
  visit(path = "") {
    cy.visit(path);
  }

  /**
   * Click on an element.
   * @param {string} selector 
   */
  click(selector) {
    cy.get(selector)
      .should("be.visible")
      .click();
  }

  /**
   * Type text into an input element.
   * @param {string} selector 
   * @param {string} text 
   */
  type(selector, text) {
    cy.get(selector)
      .should("be.visible")
      .clear()
      .type(text);
  }

  /**
   * Select a dropdown option.
   * @param {string} selector 
   * @param {string} value 
   */
  select(selector, value) {
    cy.get(selector)
      .should("be.visible")
      .select(value);
  }

  /**
   * Check a checkbox or radio button.
   * @param {string} selector 
   */
  check(selector) {
    cy.get(selector)
      .should("not.be.checked")
      .check();
  }

  /**
   * Verify an element contains expected text.
   * @param {string} selector 
   * @param {string} expectedText 
   */
  verifyText(selector, expectedText) {
    cy.get(selector)
      .should("be.visible")
      .and("contain.text", expectedText);
  }

  /**
   * Verify an element is visible.
   * @param {string} selector 
   */
  verifyVisible(selector) {
    cy.get(selector)
    .should("be.visible");
  }
}

export default BasePage;
