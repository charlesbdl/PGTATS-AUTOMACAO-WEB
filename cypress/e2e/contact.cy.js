describe('Contact Us - Upload de Arquivo', () => {
  it('deve enviar o formulário de contato com upload de arquivo', () => {
    cy.visit('https://automationexercise.com/contact_us');

    // Preenche os campos do formulário
    cy.get('[data-qa="name"]').typeSafe('Charles');
    cy.get('[data-qa="email"]').typeSafe('charles@email.com');
    cy.get('[data-qa="subject"]').typeSafe('Dúvida sobre o produto');
    cy.get('[data-qa="message"]').typeSafe('Gostaria de saber mais sobre o produto.');

    // Faz upload de um arquivo (exemplo: cypress/fixtures/exemplo.txt)
    cy.get('input[type="file"]').selectFile('cypress/fixtures/exemplo.txt');

    // Envia o formulário
    cy.get('[data-qa="submit-button"]').should('be.visible').click();

    // Valida mensagem de sucesso
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
  });
});