

class ProductsPage {

  baseUrl = 'https://automationexercise.com';
  productsUrl = 'https://automationexercise.com/products';

  productsButton = 'a[href="/products"]';

  allProductsHeading = '.title.text-center';
  productsList = '.features_items';
  productItem = '.col-sm-4';
  firstProductViewButton = 'a[href="/product_details/1"]';

  searchInput = '#search_product';
  searchButton = '#submit_search';
  searchedProductsHeading = '.title.text-center';

  productName = '.product-information h2';
  productCategory = '.product-information p:contains("Category")';
  productPrice = '.product-information span span';
  productAvailability = '.product-information p:contains("Availability")';
  productCondition = '.product-information p:contains("Condition")';
  productBrand = '.product-information p:contains("Brand")';

  
  visitHomePage() {
    cy.visit(this.baseUrl);
  }

  verifyHomePageVisible() {
    cy.url().should('eq', `${this.baseUrl}/`);
    cy.get('body').should('be.visible');
  }

  clickProductsButton() {
    cy.get(this.productsButton).should('be.visible').click();
  }

  verifyAllProductsPage() {
    cy.url({ timeout: 10000 }).should('include', '/products');
    cy.get(this.allProductsHeading)
      .should('be.visible')
      .and('contain.text', 'All Products');
  }

  verifyProductsListVisible() {
    cy.get(this.productsList).should('be.visible');
    cy.get(this.productItem).should('have.length.greaterThan', 0);
  }

  clickFirstProductViewButton() {
    cy.get('.features_items .product-image-wrapper')
      .first()
      .find('a[href^="/product_details"]')
      .should('be.visible')
      .click();
  }

  verifyProductDetailPage() {
    cy.url({ timeout: 10000 }).should('include', '/product_details/');
  }

  verifyProductNameVisible() {
    cy.get(this.productName)
      .should('be.visible')
      .and('not.be.empty');
  }

  verifyProductCategoryVisible() {
    cy.get('.product-information')
      .should('contain.text', 'Category');
  }

  verifyProductPriceVisible() {
    cy.get(this.productPrice)
      .should('be.visible')
      .and('not.be.empty');
  }

  verifyProductAvailabilityVisible() {
    cy.get('.product-information')
      .should('contain.text', 'Availability');
  }

  verifyProductConditionVisible() {
    cy.get('.product-information')
      .should('contain.text', 'Condition');
  }

  verifyProductBrandVisible() {
    cy.get('.product-information')
      .should('contain.text', 'Brand');
  }

  verifyAllProductDetails() {
    this.verifyProductNameVisible();
    this.verifyProductCategoryVisible();
    this.verifyProductPriceVisible();
    this.verifyProductAvailabilityVisible();
    this.verifyProductConditionVisible();
    this.verifyProductBrandVisible();
    
    cy.log('✅ All product details are visible!');
  }

  fillSearchInput(productName) {
    cy.get(this.searchInput)
      .should('be.visible')
      .clear()
      .type(productName);
  }

  clickSearchButton() {
    cy.get(this.searchButton).should('be.visible').click();
  }

  searchProduct(productName) {
    this.fillSearchInput(productName);
    this.clickSearchButton();
  }

  verifySearchedProductsHeading() {
    cy.get(this.searchedProductsHeading)
      .should('be.visible')
      .and('contain.text', 'Searched Products');
  }

  verifySearchedProductsVisible() {
    cy.get(this.productsList).should('be.visible');
    cy.get(this.productsList)
      .find(this.productItem)
      .should('have.length.greaterThan', 0);
  }
}

export default new ProductsPage();
