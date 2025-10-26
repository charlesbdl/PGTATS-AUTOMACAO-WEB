

class CartPage {

  baseUrl = 'https://automationexercise.com';
  cartUrl = 'https://automationexercise.com/view_cart';
  checkoutUrl = 'https://automationexercise.com/checkout';

  cartButton = 'a[href="/view_cart"]';
  continueShoppingButton = '.btn-success';
  
  cartInfo = '#cart_info';
  cartProducts = '.cart_description';
  
  addToCartButtons = '.btn.btn-default.add-to-cart';
  firstProductAddToCart = '.features_items .product-image-wrapper:first .btn.btn-default.add-to-cart';
  
  proceedToCheckoutButton = '.btn.btn-default.check_out';
  addressDetails = '#address_delivery';
  reviewOrder = '#cart_info';
  commentTextArea = 'textarea[name="message"]';
  placeOrderButton = 'a[href="/payment"]';
  
  nameOnCardInput = '[data-qa="name-on-card"]';
  cardNumberInput = '[data-qa="card-number"]';
  cvcInput = '[data-qa="cvc"]';
  expiryMonthInput = '[data-qa="expiry-month"]';
  expiryYearInput = '[data-qa="expiry-year"]';
  payButton = '[data-qa="pay-button"]';
  
  orderSuccessMessage = '.alert-success';
  
  loggedInAs = '.shop-menu > .nav > :nth-child(10) > a';
  deleteAccountButton = '.shop-menu > .nav > :nth-child(5) > a';


  visitHomePage() {
    cy.visit(this.baseUrl);
  }

  verifyHomePageVisible() {
    cy.url().should('eq', `${this.baseUrl}/`);
    cy.get('body').should('be.visible');
  }


  addFirstProductToCart() {
    cy.get(this.firstProductAddToCart)
      .should('be.visible')
      .first()
      .click({ force: true });
  }


  clickContinueShopping() {
    cy.contains('button', 'Continue Shopping')
      .should('be.visible')
      .click();
  }

  addMultipleProductsToCart(count = 2) {
    for (let i = 0; i < count; i++) {
      cy.get('.features_items .product-image-wrapper')
        .eq(i)
        .find('.btn.btn-default.add-to-cart')
        .first() 
        .click({ force: true });
      
      if (i < count - 1) {
        this.clickContinueShopping();
        cy.wait(500);
      }
    }
  }

  clickCartButton() {
    cy.contains('Cart').click();
  }

  verifyCartPage() {
    cy.url({ timeout: 10000 }).should('include', '/view_cart');
    cy.get(this.cartInfo).should('be.visible');
  }

  clickProceedToCheckout() {
    cy.get(this.proceedToCheckoutButton)
      .should('be.visible')
      .click();
  }

  verifyAddressDetails() {
    cy.get(this.addressDetails)
      .should('be.visible')
      .and('contain.text', 'Your delivery address');
  }

  verifyReviewOrder() {
    cy.get(this.reviewOrder).should('be.visible');
    cy.get('.cart_description').should('have.length.greaterThan', 0);
  }

  fillComment(comment) {
    cy.get(this.commentTextArea)
      .should('be.visible')
      .clear()
      .type(comment);
  }

  clickPlaceOrder() {
    cy.get(this.placeOrderButton)
      .should('be.visible')
      .click();
  }


  fillPaymentDetails(paymentData) {
    cy.get(this.nameOnCardInput).should('be.visible').type(paymentData.nameOnCard);
    cy.get(this.cardNumberInput).should('be.visible').type(paymentData.cardNumber);
    cy.get(this.cvcInput).should('be.visible').type(paymentData.cvc);
    cy.get(this.expiryMonthInput).should('be.visible').type(paymentData.expiryMonth);
    cy.get(this.expiryYearInput).should('be.visible').type(paymentData.expiryYear);
  }

  clickPayAndConfirm() {
    cy.get(this.payButton).should('be.visible').click();
  }

  verifyOrderSuccess() {
    cy.url({ timeout: 15000 }).should('include', '/payment_done');
    
    cy.get('body').should('be.visible');
    
    cy.contains('Congratulations').should('be.visible');
    cy.contains('order has been confirmed').should('be.visible');
  }

  verifyLoggedInAs(username) {
    cy.get(this.loggedInAs)
      .should('be.visible')
      .and('contain.text', 'Logged in as');
  }

  clickDeleteAccount() {
    cy.get(this.deleteAccountButton).should('be.visible').click();
  }

  verifyAccountDeleted() {
    cy.url({ timeout: 10000 }).should('include', '/delete_account');
    cy.contains('Account Deleted!').should('be.visible');
  }

  clickContinueAfterDelete() {
    cy.get('[data-qa="continue-button"]').should('be.visible').click();
  }
}

export default new CartPage();
