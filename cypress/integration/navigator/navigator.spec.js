describe('Navigator', () => {
  describe('OB Free Plan', () => {
    before(() => {
      cy.fixture('accountObFree').then(account => {
        cy.intercept('POST', 'https://graph.buffer.com/', {
          status: 200,
          body: account,
        })
        cy.visit('/')
      })
    })

    it('render the navigator', () => {
      cy.get('#navigator').should('exist')
      cy.get('#navigator > nav')
        .should('exist')
    })

    it('has an upgrade CTA', () => {
      cy.get('#upgradeCTA')
        .should('exist')
    })

    it('does not have an invite team CTA', () => {
      cy.get('#inviteTeamCTA')
        .should('not.exist')
    })
  })

  describe('OB Essentials Plan', () => {
    before(() => {
      cy.fixture('accountObEssential').then(account => {
        cy.intercept('POST', 'https://graph.buffer.com/', {
          status: 200,
          body: account,
        })
        cy.visit('/')
      })
    })

    it('render the navigator', () => {
      cy.get('#navigator').should('exist')
      cy.get('#navigator > nav')
        .should('exist')
    })

    it('does not have an upgrade CTA', () => {
      cy.get('#upgradeCTA')
        .should('not.exist')
    })

    it('does not have an invite team CTA', () => {
      cy.get('#inviteTeamCTA')
        .should('not.exist')
    })
  })

  describe('OB Team Plan', () => {
    before(() => {
      cy.fixture('accountObTeam').then(account => {
        cy.intercept('POST', 'https://graph.buffer.com/', {
          status: 200,
          body: account,
        })
        cy.visit('/')
      })
    })

    it('render the navigator', () => {
      cy.get('#navigator').should('exist')
      cy.get('#navigator > nav')
        .should('exist')
    })

    it('does not have an upgrade CTA', () => {
      cy.get('#upgradeCTA')
        .should('not.exist')
    })

    it('has an invite team CTA', () => {
      cy.get('#inviteTeamCTA')
        .should('exist')
    })
  })
})
