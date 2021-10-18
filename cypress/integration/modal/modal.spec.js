const REACT_APP_API_GATEWAY_URL_MATCHER = /https:\/\/(graph\.buffer|graph\.local\.buffer).com\//;

describe.only('Modal', () => {
  describe('Publish product - OB Free Plan', () => {
    before(() => {
      cy.fixture('accountObFree').then((account) => {
        cy.intercept('POST', REACT_APP_API_GATEWAY_URL_MATCHER, {
          status: 200,
          body: account,
        }).as('getAccount');

        cy.visit('https://publish.local.buffer.com:3000/');
        cy.wait('@getAccount').then(({ request }) => {
          cy.task('log', `Request finished. Request data: ${request}`);
        });
      });
    });

    it('should render the Start Trial Modal', () => {
      cy.get('#START-TRIAL-TEST').should('exist');
    });
  });
});
