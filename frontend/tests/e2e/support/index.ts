

import '@testing-library/cypress/add-commands';
import '@cypress/code-coverage/support';
import { userAuthToken } from './tokens';

Cypress.Commands.add('login', (authToken = userAuthToken) => {
  cy.setCookie('token', authToken);
});

Cypress.Commands.add('logout', () => {
  cy.clearCookie('token');
});
