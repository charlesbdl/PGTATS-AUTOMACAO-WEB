describe('Test Case 1: Register user apartir da tela inicial', () => {
    const baseUrl = 'https://automationexercise.com';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.fixture('register').as('userData');
    });

    it('should register and delete a user', function () {
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').click();

        // Gera email único
        const email = this.userData.email.replace('{{timestamp}}', Date.now());

        cy.get('input[data-qa="signup-name"]').typeSafe(this.userData.name);
        cy.get('input[data-qa="signup-email"]').typeSafe(email);

        cy.get('button[data-qa="signup-button"]').should('be.visible').click();

        cy.get('h2.title.text-center b')
            .should('be.visible')
            .invoke('text')
            .then((t) => expect(t.trim()).to.contain('Enter Account Information'));

        cy.get('[data-qa="password"]').typeSafe(this.userData.password);
        cy.get('[data-qa="days"]').select(this.userData.day);
        cy.get('[data-qa="months"]').select(this.userData.month);
        cy.get('[data-qa="years"]').select(this.userData.year);

        cy.get('[data-qa="first_name"]').typeSafe(this.userData.first_name);
        cy.get('[data-qa="last_name"]').typeSafe(this.userData.last_name);
        cy.get('[data-qa="company"]').typeSafe(this.userData.company);
        cy.get('[data-qa="address"]').typeSafe(this.userData.address);
        cy.get('[data-qa="state"]').typeSafe(this.userData.state);
        cy.get('[data-qa="city"]').typeSafe(this.userData.city);
        cy.get('[data-qa="zipcode"]').typeSafe(this.userData.zipcode);
        cy.get('[data-qa="mobile_number"]').typeSafe(this.userData.mobile_number);
        cy.get('[data-qa="create-account"]').should('be.visible').click();

        cy.get('b').should('contain.text', 'Account Created!');
        cy.get('b').should('be.visible').invoke('text').then(t => {
            expect(t.trim().toLowerCase()).to.contain('account created!');
        });
        cy.get('.col-sm-9 > :nth-child(2)').should('contain.text', 'Congratulations! Your new account has been successfully created!');
        cy.get('.col-sm-9 > :nth-child(3)').should('contain.text', 'You can now take advantage of member privileges');
        cy.get('[data-qa="continue-button"]').should('be.visible');
    });
});