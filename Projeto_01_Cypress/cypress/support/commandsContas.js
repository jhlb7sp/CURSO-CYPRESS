import loc from "./locators"

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(loc.MENU.SETTING).click()
    cy.contains(loc.MENU.CONTA).click()
})

Cypress.Commands.add('inserirConta', (nomeConta) => {
    cy.get(loc.CONTAS.NOME).type(nomeConta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})