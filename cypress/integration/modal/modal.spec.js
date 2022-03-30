const REACT_APP_API_GATEWAY_URL_MATCHER = /https:\/\/(graph\.buffer|graph\.local\.buffer).com\//;

describe('Modal', () => {
  describe('Plan selector - Free plan', () => {
    beforeEach(() => {
      cy.fixture('accountObFree').then((account) => {
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

    it('should render the Plan Selector Modal with Essentials and Team displayed', () => {
      cy.get('#render_plan_selector').click();

      // Plans displayed
      cy.get('#essentials_year').should('exist');
      cy.get('#team_year').should('exist');

      // Plans NOT displayed
      cy.get('#free_year').should('not.exist');
      cy.get('#agency_year').should('not.exist');

      // Try agency should be displayed
      cy.get('#agency_plan_section').should('exist');

      // Try Free should NOT be displayed
      cy.get('#free_plan_section').should('not.exist');

      // It should default to Esstential year
      cy.get('#essentials_year').should('have.attr', 'aria-label', 'checked');
    });
  });

  describe('Plan selector - Essentials plan', () => {
    beforeEach(() => {
      cy.fixture('accountObEssential').then((account) => {
        cy.intercept('POST', REACT_APP_API_GATEWAY_URL_MATCHER, {
          status: 200,
          body: account,
        });
        cy.visit('/');
      });
    });

    it('should render the Plan Selector Modal with Free, Essentials and Team plans displayed', () => {
      cy.get('#render_plan_selector').click();

      // Plans displayed
      cy.get('#free_year').should('exist');
      cy.get('#essentials_year').should('exist');
      cy.get('#team_year').should('exist');

      // Plans NOT displayed
      cy.get('#agency_year').should('not.exist');

      // Try agency should be displayed
      cy.get('#agency_plan_section').should('exist');

      // Try Free should NOT be displayed
      cy.get('#free_lan_section').should('not.exist');

      // It should default to Esstential year
      cy.get('#essentials_year').should('have.attr', 'aria-label', 'checked');
    });
  });

  describe('Plan selector - Team plan', () => {
    beforeEach(() => {
      cy.fixture('accountObTeam').then((account) => {
        cy.intercept('POST', REACT_APP_API_GATEWAY_URL_MATCHER, {
          status: 200,
          body: account,
        });
        cy.visit('/');
      });
    });

    it('should render the Plan Selector Modal with Free, Essentials and Team plans displayed', () => {
      cy.get('#render_plan_selector').click();

      // Plans displayed
      cy.get('#free_year').should('exist');
      cy.get('#essentials_year').should('exist');
      cy.get('#team_year').should('exist');

      // Plans NOT displayed
      cy.get('#agency_year').should('not.exist');

      // Try agency should be displayed
      cy.get('#agency_plan_section').should('exist');

      // Try Free should NOT be displayed
      cy.get('#free_lan_section').should('not.exist');

      // It should default to Team year
      cy.get('#team_year').should('have.attr', 'aria-label', 'checked');
    });
  });
});
