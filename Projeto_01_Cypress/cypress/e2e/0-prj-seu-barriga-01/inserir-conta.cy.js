/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Inserir conta', () =>{
    beforeEach(() =>{
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('jota@jota', 'jota')
        //cy.resetApp();
        cy.resetApp();
    })
    it('validar inserir uma conta', () => {
        cy.get(loc.MESSAGE.MSG).should('contain', 'Bem vindo')
        cy.get(loc.MESSAGE.BTN_MSG).click()

        cy.acessarMenuConta()
        //validar se esta na tela de contas
        cy.url().should('contains', '/contas')
        cy.get('h2').should('have.text', 'Contas')
        //incluindo dados da conta
        
        cy.inserirConta('Conta_01')

        //cy.get(loc.MESSAGE.MSG).invoke('text').then((text) => {
        //expect(text).to.match(/Conta inserida/)})

       cy.get(loc.MESSAGE.MSG).should('have.text', 'Conta inserida com sucesso!')
  })

    it('validar inserir uma conta duplicada', () => {
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jota!')
        cy.get(loc.MESSAGE.BTN_MSG).click()

        cy.acessarMenuConta()
        //validar se esta na tela de contas
        cy.url().should('contains', '/contas')
        cy.get('h2').should('have.text', 'Contas')
        //incluindo dados da conta
        cy.inserirConta('Conta_01')

        cy.get(loc.MESSAGE.MSG).should('have.text','Erro: Error: Request failed with status code 400' )
    })

    it('validar alterar uma conta', () => {
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jota!')
        cy.get(loc.MESSAGE.BTN_MSG).click()

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta Alterada')).click()
        cy.get(loc.CONTAS.NOME).clear().type('Alterando Campo 2')
        cy.get(loc.CONTAS.BTN_SALVAR).click()

        cy.get(loc.MESSAGE.MSG).should('contain', 'Conta atualizada')

    })

    it('validar excluir uma conta', () => {
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jota!')
        cy.get(loc.MESSAGE.BTN_MSG).click()

        cy.acessarMenuConta()
       //cy.xpath('//*[@id="root"]/div/div/div[2]/table/tbody/tr[5]/td[2]/a[2]/i').click()
        cy.xpath(loc.CONTAS.XP_BTN_EXCLUIR).click()

      cy.get(loc.MESSAGE.MSG).should('have.text', 'Conta excluída com sucesso!') 

  })
})
