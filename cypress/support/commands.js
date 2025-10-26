
Cypress.Commands.add('typeSafe', { prevSubject: 'element' }, (subject, value) => {
	cy.wrap(subject).should('be.visible').clear().type(value);
});
