
class RegisterPage {

  signupLink = '.shop-menu > .nav > :nth-child(4) > a';

  // Campos de Signup
  signupNameInput = '//input[@data-qa="signup-name"]';
  signupEmailInput = '//input[@data-qa="signup-email"]';
  signupButton = '[data-qa="signup-button"]';
  signupErrorMessage = '//p[contains(text(), "Email Address already exist!")]';
  newUserSignupHeading = '//h2[contains(text(), "New User Signup!")]';

  passwordInput = '[data-qa="password"]';
  daysSelect = '[data-qa="days"]';
  monthsSelect = '[data-qa="months"]';
  yearsSelect = '[data-qa="years"]';
  firstNameInput = '[data-qa="first_name"]';
  lastNameInput = '[data-qa="last_name"]';
  companyInput = '[data-qa="company"]';
  addressInput = '[data-qa="address"]';
  stateInput = '[data-qa="state"]';
  cityInput = '[data-qa="city"]';
  zipcodeInput = '[data-qa="zipcode"]';
  mobileNumberInput = '[data-qa="mobile_number"]';
  createAccountButton = '[data-qa="create-account"]';

  accountCreatedMessage = 'h2.title.text-center';
  continueButton = '[data-qa="continue-button"]';

  visitHomePage(baseUrl = 'https://automationexercise.com') {
    cy.visit(baseUrl);
  }

  clickSignupLink() {
    cy.get(this.signupLink).should('be.visible').click();
    cy.url().should('include', 'login');
  }

  fillSignupForm(name, email) {
    cy.xpath(this.signupNameInput).should('be.visible').type(name);
    cy.xpath(this.signupEmailInput).should('be.visible').type(email);
  }

  clickSignupButton() {
    cy.get(this.signupButton).should('be.visible').click();
    cy.url({ timeout: 10000 }).should('include', 'signup');
  }

  fillPersonalInfo(data) {
    cy.get(this.passwordInput).scrollIntoView().should('be.visible').type(data.password);
    cy.get(this.firstNameInput).scrollIntoView().should('be.visible').type(data.firstName);
    cy.get(this.lastNameInput).scrollIntoView().should('be.visible').type(data.lastName);
    cy.get(this.companyInput).scrollIntoView().should('be.visible').type(data.company);
    cy.get(this.addressInput).scrollIntoView().should('be.visible').type(data.address);
    cy.get(this.stateInput).scrollIntoView().should('be.visible').type(data.state);
    cy.get(this.cityInput).scrollIntoView().should('be.visible').type(data.city);
    cy.get(this.zipcodeInput).scrollIntoView().should('be.visible').type(data.zipcode);
    cy.get(this.mobileNumberInput).scrollIntoView().should('be.visible').type(data.mobileNumber);
  }


  selectBirthDate(day, month, year) {
    cy.get(this.daysSelect).scrollIntoView().should('be.visible').select(day);
    cy.get(this.monthsSelect).should('be.visible').select(month);
    cy.get(this.yearsSelect).should('be.visible').select(year);
  }


  clickCreateAccountButton() {
    cy.get(this.createAccountButton).scrollIntoView().should('be.visible').click();
  }


  verifyAccountCreatedSuccess() {
    cy.url({ timeout: 15000 }).should('include', 'account_created');
    cy.get(this.accountCreatedMessage, { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Account Created');
  }


  clickContinueButton() {
    cy.get(this.continueButton).should('be.visible').click();
  }


  generateUniqueEmail(baseEmail = 'test') {
    const timestamp = Date.now();
    return `${baseEmail}-${timestamp}@example.com`;
  }


  registerNewUser(userData) {
    this.clickSignupLink();

    const uniqueEmail = this.generateUniqueEmail('user');
    this.fillSignupForm(userData.name || 'Test User', uniqueEmail);
    this.clickSignupButton();

    this.fillPersonalInfo(userData);
    this.selectBirthDate(userData.day, userData.month, userData.year);

    this.clickCreateAccountButton();

    this.verifyAccountCreatedSuccess();

    return uniqueEmail; 
  }

  verifyNewUserSignupVisible() {
    cy.xpath(this.newUserSignupHeading).should('be.visible');
  }


  verifyEmailAlreadyExistError() {
    cy.xpath(this.signupErrorMessage, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Email Address already exist!');
  }
}

export default new RegisterPage();
