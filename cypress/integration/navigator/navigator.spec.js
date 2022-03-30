const REACT_APP_API_GATEWAY_URL_MATCHER = /https:\/\/(graph\.buffer|graph\.local\.buffer).com\//;

describe('Navigator', () => {
  describe('OB Free Plan', () => {
    before(() => {
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

    it('render the navigator', () => {
      cy.get('#navigator').should('exist');
      cy.get('#navigator > nav').should('exist');
    });

    it('has an upgrade CTA', () => {
      cy.get('#upgradeCTA').should('exist');
    });

    it('does not have an invite team CTA', () => {
      cy.get('#inviteTeamCTA').should('not.exist');
    });
  });

  describe('OB Free Plan - upgrade flow', () => {
    before(() => {
      cy.fixture('accountObFreeUpgrade').then((account) => {
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

    it('render the navigator', () => {
      cy.get('#navigator').should('exist');
      cy.get('#navigator > nav').should('exist');
    });

    it('has an upgrade CTA', () => {
      cy.contains('Upgrade').should('exist');
    });

    it('a user can upgrade to essentials after clicking the upgrade button', () => {
      cy.get('#upgradeCTA').click();
      cy.get('#essentials_year').should('exist');
      cy.get('#essentials_year').should('have.attr', 'aria-label', 'checked');
    });
  });

  describe('OB Essentials Plan', () => {
    before(() => {
      cy.fixture('accountObEssential').then((account) => {
        cy.intercept('POST', REACT_APP_API_GATEWAY_URL_MATCHER, {
          status: 200,
          body: account,
        });
        cy.visit('/');
      });
    });

    it('render the navigator', () => {
      cy.get('#navigator').should('exist');
      cy.get('#navigator > nav').should('exist');
    });

    it('does not have an upgrade CTA', () => {
      cy.get('#upgradeCTA').should('not.exist');
    });

    it('does not have an invite team CTA', () => {
      cy.get('#inviteTeamCTA').should('not.exist');
    });
  });

  describe('OB Team Plan', () => {
    before(() => {
      cy.fixture('accountObTeam').then((account) => {
        cy.intercept('POST', REACT_APP_API_GATEWAY_URL_MATCHER, {
          status: 200,
          body: account,
        });
        cy.visit('/');
      });
    });

    it('render the navigator', () => {
      cy.get('#navigator').should('exist');
      cy.get('#navigator > nav').should('exist');
    });

    it('does not have an upgrade CTA', () => {
      cy.get('#upgradeCTA').should('not.exist');
    });

    it('has an invite team CTA', () => {
      cy.get('#inviteTeamCTA').should('exist');
    });
  });
});
