describe('Navigator', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
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
})
