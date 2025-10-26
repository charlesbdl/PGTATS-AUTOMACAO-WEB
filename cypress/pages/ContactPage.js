
class ContactPage {

  pageUrl = 'https://automationexercise.com/contact_us';

  nameInput = '//input[@data-qa="name"]';
  emailInput = '//input[@data-qa="email"]';
  subjectInput = '//input[@data-qa="subject"]';
  messageInput = '//*[@data-qa="message"]';
  fileInput = '//input[@type="file"]';
  submitButton = '//*[@data-qa="submit-button"]';

  successMessage = '//*[contains(text(), "Success") and contains(text(), "submitted")]';
  errorMessage = '//*[contains(text(), "Error")]';

  visitPage() {
    cy.visit(this.pageUrl);
  }

  fillName(name) {
    cy.xpath(this.nameInput).should('be.visible').type(name);
  }

  fillEmail(email) {
    cy.xpath(this.emailInput).should('be.visible').type(email);
  }

  fillSubject(subject) {
    cy.xpath(this.subjectInput).should('be.visible').type(subject);
  }

  fillMessage(message) {
    cy.xpath(this.messageInput).should('be.visible').type(message);
  }

  uploadFile(filePath) {
    cy.xpath(this.fileInput).selectFile(filePath);
  }

  submitForm() {
    cy.xpath(this.submitButton).should('be.visible').click();
  }

  fillContactForm(data) {
    if (data.name) this.fillName(data.name);
    if (data.email) this.fillEmail(data.email);
    if (data.subject) this.fillSubject(data.subject);
    if (data.message) this.fillMessage(data.message);
  }

  verifySuccessMessage() {
    cy.xpath(this.successMessage, { timeout: 10000 }).should('be.visible');
  }

  verifyErrorMessage() {
    cy.xpath(this.errorMessage).should('be.visible');
  }

  submitContactForm(data) {
    this.visitPage();
    this.fillContactForm(data);
    
    if (data.file) {
      this.uploadFile(data.file);
    }
    
    this.submitForm();
    this.verifySuccessMessage();
  }

  verifyFormFields() {
    cy.xpath(this.nameInput).should('be.visible');
    cy.xpath(this.emailInput).should('be.visible');
    cy.xpath(this.subjectInput).should('be.visible');
    cy.xpath(this.messageInput).should('be.visible');
    cy.xpath(this.fileInput).should('exist');
    cy.xpath(this.submitButton).should('be.visible');
  }
}

export default new ContactPage();
