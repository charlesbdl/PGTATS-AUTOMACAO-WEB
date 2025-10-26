
class FooterPage {

  baseUrl = 'https://automationexercise.com';

  footer = 'footer';
  subscriptionHeading = '.single-widget h2';
  subscriptionEmailInput = '#susbscribe_email';
  subscriptionButton = '#subscribe';
  subscriptionSuccessMessage = '.alert-success';

  visitHomePage() {
    cy.visit(this.baseUrl);
  }

  verifyHomePageVisible() {
    cy.url().should('eq', `${this.baseUrl}/`);
    cy.get('body').should('be.visible');
  }

  scrollToFooter() {
    cy.get(this.footer).scrollIntoView();
  }

  verifySubscriptionTextVisible() {
    cy.get(this.subscriptionHeading)
      .should('be.visible')
      .and('contain.text', 'Subscription');
  }

  fillSubscriptionEmail(email) {
    cy.get(this.subscriptionEmailInput)
      .should('be.visible')
      .clear()
      .type(email);
  }

  clickSubscriptionButton() {
    cy.get(this.subscriptionButton).should('be.visible').click();
  }


  verifySubscriptionSuccessMessage() {
    cy.get(this.subscriptionSuccessMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
  }

  subscribeWithEmail(email) {
    this.scrollToFooter();
    this.verifySubscriptionTextVisible();
    this.fillSubscriptionEmail(email);
    this.clickSubscriptionButton();
    this.verifySubscriptionSuccessMessage();
  }
}

export default new FooterPage();
