import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ContactPage from '../pages/ContactPage';
import ProductsPage from '../pages/ProductsPage';
import FooterPage from '../pages/FooterPage';
import CartPage from '../pages/CartPage';

describe('Trabalho final ', () => {
    const baseUrl = 'https://automationexercise.com';

    beforeEach(() => {
        RegisterPage.visitHomePage(baseUrl);
    });

    it('Test Case 1: Register User', function () {
        cy.fixture('register').then((userData) => {
            const generatedEmail = RegisterPage.registerNewUser(userData);
            
            cy.log(` Usuário registrado com sucesso!`);
            cy.log(` Email utilizado: ${generatedEmail}`);
        });
    });

    it('Test Case 2 and 4: Register,logout and Login User with correct email and password', function () {
        cy.fixture('register').then((userData) => {
            cy.log(': Creating new user...');
            
            RegisterPage.clickSignupLink();
            const uniqueEmail = RegisterPage.generateUniqueEmail('testuser');
            RegisterPage.fillSignupForm(userData.name || 'Test User', uniqueEmail);
            RegisterPage.clickSignupButton();

            RegisterPage.fillPersonalInfo(userData);
            RegisterPage.selectBirthDate(userData.day, userData.month, userData.year);
            RegisterPage.clickCreateAccountButton();
            
            cy.url({ timeout: 15000 }).should('include', 'account_created');
            cy.wait(2000);
            RegisterPage.clickContinueButton();

            cy.log(` Usuário criado com sucesso!`);
            cy.log(` Email: ${uniqueEmail}`);
            cy.log(` Senha: ${userData.password}`);

            cy.url({ timeout: 10000 }).should('eq', 'https://automationexercise.com/');
            cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').click();
            cy.log(' Logout realizado!');
            
            LoginPage.visitHomePage();
    
            LoginPage.verifyHomePageVisible();

            LoginPage.clickSignupLoginButton();
            LoginPage.verifyLoginToYourAccountVisible();

            LoginPage.fillLoginEmail(uniqueEmail);
            LoginPage.fillLoginPassword(userData.password);

            LoginPage.clickLoginButton();

            LoginPage.verifyLoggedInAsUsername(userData.name || 'Test User');

            cy.log(' Login realizado com sucesso!');

        });
    });

    it('Test Case 3: Login User with incorrect email and password', function () {
        const incorrectUser = {
            email: 'wrong@example.com',
            password: 'wrongpassword123'
        };

        LoginPage.verifyHomePageVisible();

        LoginPage.clickSignupLoginButton();
        LoginPage.verifyLoginToYourAccountVisible();
        LoginPage.fillLoginEmail(incorrectUser.email);
        LoginPage.fillLoginPassword(incorrectUser.password);

        LoginPage.clickLoginButton();

        LoginPage.verifyLoginErrorMessage();

    });

    it('Test Case 5: Register User with existing email', function () {
        cy.fixture('register').then((userData) => {
            cy.log('STEP 1: Creating first user...');
            
            RegisterPage.clickSignupLink();
            const firstEmail = RegisterPage.generateUniqueEmail('testuser');
            RegisterPage.fillSignupForm(userData.name || 'Test User', firstEmail);
            RegisterPage.clickSignupButton();

            RegisterPage.fillPersonalInfo(userData);
            RegisterPage.selectBirthDate(userData.day, userData.month, userData.year);
            RegisterPage.clickCreateAccountButton();
            
            cy.url({ timeout: 15000 }).should('include', 'account_created');
            cy.wait(2000);
            RegisterPage.clickContinueButton();

            cy.log(` Primeiro usuário criado com sucesso!`);
            cy.log(` Email usado: ${firstEmail}`);

            cy.log(' STEP 2: Logging out...');
            cy.url({ timeout: 10000 }).should('eq', 'https://automationexercise.com/');
            cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').click();
            cy.log(' Logout realizado!');

            cy.log(' STEP 3: Trying to register with same email...');
            
            RegisterPage.visitHomePage('https://automationexercise.com');
            cy.url().should('eq', 'https://automationexercise.com/');

            RegisterPage.clickSignupLink();

            RegisterPage.verifyNewUserSignupVisible();

            RegisterPage.fillSignupForm(userData.name || 'Test User', firstEmail);

            RegisterPage.clickSignupButton();

            RegisterPage.verifyEmailAlreadyExistError();

            cy.log(' Test Case 5 completed successfully!');
        });
    });

  it('Test Case 6: Contact Us Form', () => {
    const contactData = {
      name: 'Charles',
      email: 'charles@email.com',
      subject: 'Dúvida sobre o produto',
      message: 'Gostaria de saber mais sobre o produto.',
      file: 'cypress/fixtures/exemplo.txt'
    };
    ContactPage.visitPage();
    ContactPage.submitContactForm(contactData);
  });

  it('Test Case 8: Verify All Products and product detail page', function () {

    ProductsPage.verifyHomePageVisible();

    ProductsPage.clickProductsButton();

    ProductsPage.verifyAllProductsPage();

    ProductsPage.verifyProductsListVisible();

    ProductsPage.clickFirstProductViewButton();

    ProductsPage.verifyProductDetailPage();

    ProductsPage.verifyAllProductDetails();

    cy.log(' Test Case 8 completed successfully!');
  });

  it('Test Case 9: Search Product', function () {
    const searchTerm = 'Dress';

    ProductsPage.verifyHomePageVisible();

    ProductsPage.clickProductsButton();

    ProductsPage.verifyAllProductsPage();

    ProductsPage.searchProduct(searchTerm);

    ProductsPage.verifySearchedProductsHeading();

    ProductsPage.verifySearchedProductsVisible();

    cy.log(' Test Case 9 completed successfully!');
    cy.log(` Searched for: "${searchTerm}"`);
  });

  it('Test Case 10: Verify Subscription in home page', function () {
    const subscriptionEmail = 'testsubscription@example.com';

    FooterPage.verifyHomePageVisible();

    FooterPage.scrollToFooter();

    FooterPage.verifySubscriptionTextVisible();

    FooterPage.fillSubscriptionEmail(subscriptionEmail);
    FooterPage.clickSubscriptionButton();

    FooterPage.verifySubscriptionSuccessMessage();

    cy.log(` Subscribed with: "${subscriptionEmail}"`);
  });

  it.only('Test Case 15: Place Order - Register before Checkout', function () {
    cy.fixture('register').then((userData) => {
      // 1. Launch browser (já feito no beforeEach)
      // 2. Navigate to url 'http://automationexercise.com' (já feito no beforeEach)
      
      // 3. Verify that home page is visible successfully
      CartPage.verifyHomePageVisible();

      // 4. Click 'Signup / Login' button
      RegisterPage.clickSignupLink();

      // 5. Fill all details in Signup and create account
      const uniqueEmail = RegisterPage.generateUniqueEmail('buyer');
      RegisterPage.fillSignupForm(userData.name || 'Test Buyer', uniqueEmail);
      RegisterPage.clickSignupButton();
      RegisterPage.fillPersonalInfo(userData);
      RegisterPage.selectBirthDate(userData.day, userData.month, userData.year);
      RegisterPage.clickCreateAccountButton();

      // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
      cy.url({ timeout: 15000 }).should('include', 'account_created');
      cy.wait(2000);
      RegisterPage.clickContinueButton();

      // 7. Verify 'Logged in as username' at top
      CartPage.verifyLoggedInAs(userData.name || 'Test Buyer');

      // 8. Add products to cart
      CartPage.addMultipleProductsToCart(2);

      // 9. Click 'Cart' button
      CartPage.clickCartButton();

      // 10. Verify that cart page is displayed
      CartPage.verifyCartPage();

      // 11. Click Proceed To Checkout
      CartPage.clickProceedToCheckout();

      // 12. Verify Address Details and Review Your Order
      CartPage.verifyAddressDetails();
      CartPage.verifyReviewOrder();

      // 13. Enter description in comment text area and click 'Place Order'
      CartPage.fillComment('Please deliver between 9 AM - 5 PM');
      CartPage.clickPlaceOrder();

      // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
      const paymentData = {
        nameOnCard: 'Test User',
        cardNumber: '4111111111111111',
        cvc: '123',
        expiryMonth: '12',
        expiryYear: '2027'
      };
      CartPage.fillPaymentDetails(paymentData);

      // 15. Click 'Pay and Confirm Order' button
      CartPage.clickPayAndConfirm();

      // 16. Verify success message 'Your order has been placed successfully!'
      CartPage.verifyOrderSuccess();

      // 17. Click 'Delete Account' button
      CartPage.clickDeleteAccount();

      // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
      CartPage.verifyAccountDeleted();
      CartPage.clickContinueAfterDelete();

      cy.log('✅ Test Case 15 completed successfully!');
      cy.log(`🛒 Order placed with email: ${uniqueEmail}`);
    });
  });

   
});