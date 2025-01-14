

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const date = new Date();
const isoDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

Given('a list of multiple fishbowls', () => {
  cy.intercept(
    {
      pathname: '/fishbowls',
      query: {
        'finishDateTime[after]': isoDate
      }
    },
    { fixture: 'multiple-fishbowl-list.json' }
  ).as('getMultipleFishbowlsListQuery');
});

Given('a list of empty fishbowls', () => {
  cy.intercept(
    {
      pathname: '/fishbowls',
      query: {
        'finishDateTime[after]': isoDate
      }
    },
    []
  ).as('getEmptyFishbowlsListQuery');
});

When('clicks on its profile', () => {
  cy.get('header').within(() => {
    cy.findByRole('button', { name: 'Linwood Hahn' }).click({ force: true });
  });
});

Then('sees the fishbowl list page with one fishbowl', () => {
  cy.wait('@getOneFishbowlsListQuery');

  cy.get('[data-testid=scheduled-header]').should('exist');
  cy.get('[data-testid=count]').should('contain', '1');

  cy.screenshot();
});

Then('sees the fishbowl list page with multiple fishbowls', () => {
  cy.wait('@getMultipleFishbowlsListQuery');

  cy.get('[data-testid=scheduled-header]').should('exist');
  cy.get('[data-testid=count]').should('contain', '3');

  cy.get('[data-testid=fishbowl-list-wrapper] h4').eq(0).should('contain', 'First fishbowl');
  cy.get('[data-testid=fishbowl-list-wrapper] h4').eq(1).should('contain', 'Second fishbowl');
  cy.get('[data-testid=fishbowl-list-wrapper] h4').eq(2).should('contain', 'Third fishbowl');

  cy.screenshot();
});

Then('sees the empty fishbowl list page', () => {
  cy.wait('@getEmptyFishbowlsListQuery');

  cy.get('[data-testid=scheduled-header]').should('exist');
  cy.get('[data-testid=empty-list]').should('exist');
  cy.get('[data-testid=count]').should('contain', '0');

  cy.screenshot();
});
