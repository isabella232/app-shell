const REACT_APP_API_GATEWAY_URL_MATCHER = /https:\/\/(graph\.buffer|graph\.local\.buffer).com\//;

describe('Quantity Update', () => {
  describe('OB Essential', () => {
    before(() => {
      cy.fixture('accountObEssential').then((account) => {
        cy.intercept('POST', REACT_APP_API_GATEWAY_URL_MATCHER, {
          status: 200,
          body: account,
        }).as('getAccount');
        cy.visit('/');
        cy.wait('@getAccount').then(({ request }) => {
          cy.task('log', `Request finished. Request data: ${request}`);
        });
      });
    });

    it('render the quantity update, increase quantity and confirm', () => {
      cy.get('#render_quantity_update').click();
      cy.get('#confirm_and_pay').should('exist');
      cy.get('#confirm_and_pay').should('be.disabled');
      // Increase quantity from 2 to 3
      cy.get(
        '.Counterstyle__ChannelsCounterContainer-app-shell__sc-191tpnl-0 > :nth-child(3)'
      ).click();
      cy.get('#confirm_and_pay').should('not.be.disabled');
      cy.get('#confirm_and_pay').click();
      cy.get('#confirmation').should('exist');
      cy.get('#confirmation').click();
    });
  });
});
