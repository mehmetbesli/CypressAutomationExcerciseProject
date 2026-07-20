import BasePage from "./BasePage";

class ProductsPage extends BasePage {
  constructor() {
    super();
    this.selectors = {
      searchProductInput: "#search_product",
      submitSearchBtn: "#submit_search",
      searchedProductsHeader: ".features_items h2.title",
      productItems: ".features_items .col-sm-4",
      addToCartBtn: ".productinfo .add-to-cart",
      viewCartLink: ".modal-body a[href='/view_cart']"
    };
  }

  searchProduct(productName) {
    this.type(this.selectors.searchProductInput, productName);
    this.click(this.selectors.submitSearchBtn);
  }

  verifySearchedProductsHeader(expectedText) {
    this.verifyText(this.selectors.searchedProductsHeader, expectedText);
  }

  verifyProductVisible(productName) {
    // Assert that at least one product with product name is visible
    cy.get(this.selectors.productItems)
      .should("be.visible")
      .and("contain.text", productName);
  }

  addFirstProductToCart() {
    // We target the first product's add-to-cart button
    cy.get(this.selectors.addToCartBtn).first().click();
  }

  clickViewCartInModal() {
    this.click(this.selectors.viewCartLink);
  }
}

export default new ProductsPage();
