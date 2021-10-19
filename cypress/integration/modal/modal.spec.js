const REACT_APP_API_GATEWAY_URL_MATCHER = /https:\/\/(graph\.buffer|graph\.local\.buffer).com\//;

describe.only('Modal', () => {
  describe('Publish product - OB Free Plan', () => {
    before(() => {
      cy.fixture('accountObFree').then((account) => {
        cy.intercept('POST', REACT_APP_API_GATEWAY_URL_MATCHER, {
          status: 200,
          body: account,
        }).as('getAccount');

        cy.visit(Cypress.env('PUBLISH_URL'));
        cy.wait('@getAccount').then(({ request }) => {
          cy.task('log', `Request finished. Request data: ${request}`);
        });
      });
    });

    it('should render the Start Trial Modal', () => {
      cy.get('#start-trial-modal').should('exist');
    });
  });
});
