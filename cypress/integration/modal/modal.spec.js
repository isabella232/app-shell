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

      cy.get('#essentials_year').should('exist');
      cy.get('#team_year').should('exist');
      cy.get('#free_year').should('not.exist');
      cy.get('#agency_year').should('not.exist');
    });

    it('should render the Plan Selector Modal with Agency CTA displayed in footer', () => {
      cy.get('#render_plan_selector').click();

      cy.get('#agency_plan_section').should('exist');
      cy.get('#agency_month').should('not.exist');
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

    it('should render the Plan Selector Modal with Essentials plan yearly selected when this is the current users plan', () => {
      cy.get('#render_plan_selector').click();

      cy.get('#essentials_year').should('exist');
      cy.get('#essentials_year').should('have.attr', 'aria-label', 'checked');
    });

    it('should render the Plan Selector Modal with Free, Essentials and Team plans displayed', () => {
      cy.get('#render_plan_selector').click();

      cy.get('#essentials_year').should('exist');
      cy.get('#team_year').should('exist');
      cy.get('#free_year').should('exist');
      cy.get('#agency_year').should('not.exist');
    });

    it('should render the Plan Selector Modal with Agency CTA displayed in footer', () => {
      cy.get('#render_plan_selector').click();

      cy.get('#agency_plan_section').should('exist');
      cy.get('#agency_month').should('not.exist');
    });
  });
});
