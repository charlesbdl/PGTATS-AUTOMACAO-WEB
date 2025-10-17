// cypress/support/index.d.ts
// Tipagem para comandos customizados Cypress

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Preenche campo de texto de forma segura (visível, clear, type)
     * @param value O valor a ser digitado
     * @example
     * cy.get('input').typeSafe('valor')
     */
    typeSafe(value: string): Chainable<Subject>;
  }
}
