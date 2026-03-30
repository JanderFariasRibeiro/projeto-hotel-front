describe('Testes de login', () => {
  it('logar com sucesso', () => {
    cy.visit('http://localhost:5173')
    cy.get('input[placeholder="Usuário"]').type('camila@gmail.com')
    cy.get('input[placeholder="Senha"]').type('123456')
    cy.contains('button', 'Entrar').click()
    cy.url().should('include', '/admin')
  })

  it('falha ao logar', () => {
    cy.visit('http://localhost:5173')
    cy.get('input[placeholder="Usuário"]').type('camila@gmail.com')
    cy.get('input[placeholder="Senha"]').type('senhaerrada')
    cy.contains('button', 'Entrar').click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal('Alerta: Email ou senha incorretos')
    })
  })
})