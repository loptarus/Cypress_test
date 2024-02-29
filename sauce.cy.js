// sauce.cy.js

describe('Testing the website www.saucedemo.com', () => {

it('Scenario 1: Accessing the login page', () => {
cy.visit('https://www.saucedemo.com/');
cy.contains('Welcome to the Sauce Labs Test Site').should('be.visible');
cy.get('#user-name').should('be.visible');
cy.get('#password').should('be.visible');
cy.get('#login-button').should('be.visible');
});

it('Scenario 2: User login with valid credentials', () => {
cy.visit('https://www.saucedemo.com/');
cy.get('#user-name').type('standard_user');
cy.get('#password').type('secret_sauce');
cy.get('#login-button').click();
cy.url().should('include', '/inventory.html');
cy.contains('Products').should('be.visible');
});

it('Scenario 3: User login with invalid credentials', () => {
cy.visit('https://www.saucedemo.com/');
cy.get('#user-name').type('invalid_user');
cy.get('#password').type('invalid_password');
cy.get('#login-button').click();
cy.contains('Epic sadface').should('be.visible');
});

it('Scenario 4: Add product to cart', () => {
cy.login('standard_user', 'secret_sauce');
cy.get('.inventory_list > :nth-child(1) .btn_primary').click();
cy.get('.shopping_cart_badge').should('have.text', '1');
});

it('Scenario 5: Remove product from cart', () => {
cy.login('standard_user', 'secret_sauce');
cy.get('.inventory_list > :nth-child(1) .btn_primary').click();
cy.get('.shopping_cart_badge').should('have.text', '1');
cy.get('.inventory_list > :nth-child(1) .btn_secondary').click();
cy.get('.shopping_cart_badge').should('not.exist');
});

it('Scenario 6: Logout from the website', () => {
cy.login('standard_user', 'secret_sauce');
cy.get('#react-burger-menu-btn').click();
cy.get('#logout_sidebar_link').click();
cy.url().should('include', '/index.html');
cy.contains('Username').should('be.visible');
});

});