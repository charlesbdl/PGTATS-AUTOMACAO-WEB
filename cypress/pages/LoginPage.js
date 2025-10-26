
class LoginPage {

  baseUrl = 'https://automationexercise.com';
  
  signupLoginButton = '.shop-menu > .nav > :nth-child(4) > a';
  
  loginHeading = '//h2[contains(text(), "Login to your account")]';
  loginEmailInput = '[data-qa="login-email"]';
  loginPasswordInput = '[data-qa="login-password"]';
  loginButton = '[data-qa="login-button"]';
  loginErrorMessage = '//p[contains(text(), "Your email or password is incorrect!")]';
  
  loggedInAsText = '//a[contains(text(), "Logged in as")]';
  usernameText = '.shop-menu > .nav > :nth-child(10) > a';
  
  deleteAccountButton = '.shop-menu > .nav > :nth-child(5) > a';
  accountDeletedMessage = '//h2[@data-qa="account-deleted"]';
  accountDeletedTitle = '//b[contains(text(), "Account Deleted!")]';
  continueButton = '[data-qa="continue-button"]';

  visitHomePage() {
    cy.visit(this.baseUrl);
  }

  verifyHomePageVisible() {
    cy.url().should('eq', `${this.baseUrl}/`);
    cy.get('body').should('be.visible');
  }

  clickSignupLoginButton() {
    cy.get(this.signupLoginButton).should('be.visible').click();
  }

  verifyLoginToYourAccountVisible() {
    cy.xpath(this.loginHeading).should('be.visible');
  }


  fillLoginEmail(email) {
    cy.get(this.loginEmailInput).should('be.visible').clear().type(email);
  }

  fillLoginPassword(password) {
    cy.get(this.loginPasswordInput).should('be.visible').clear().type(password);
  }


  clickLoginButton() {
    cy.get(this.loginButton).should('be.visible').click();
  }

  verifyLoggedInAsUsername(username) {
    cy.xpath(this.loggedInAsText)
      .should('be.visible')
      .and('contain.text', 'Logged in as');
    
    if (username) {
      cy.get(this.usernameText).should('contain.text', username);
    }
  }

  clickDeleteAccountButton() {
    cy.get(this.deleteAccountButton).should('be.visible').click();
  }

  verifyAccountDeletedVisible() {
    cy.xpath(this.accountDeletedMessage, { timeout: 10000 })
      .should('be.visible');
    cy.xpath(this.accountDeletedTitle)
      .should('be.visible')
      .and('contain.text', 'Account Deleted!');
  }

  clickContinueButton() {
    cy.get(this.continueButton).should('be.visible').click();
  }

  loginUser(email, password) {
    this.clickSignupLoginButton();
    this.verifyLoginToYourAccountVisible();
    this.fillLoginEmail(email);
    this.fillLoginPassword(password);
    this.clickLoginButton();
  }

  loginAndDeleteAccount(email, password, username) {
    this.visitHomePage();
    this.verifyHomePageVisible();
    this.loginUser(email, password);
    this.verifyLoggedInAsUsername(username);
    this.clickDeleteAccountButton();
    this.verifyAccountDeletedVisible();
  }

  verifyLoginErrorMessage() {
    cy.xpath(this.loginErrorMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!');
  }
}

export default new LoginPage();
