/// <reference types='cypress' />
import loc from '../../support/locators'

describe('Movimentação de conta', () =>{
    beforeEach(() =>{
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login();
    })

    it('validar incluir despesa pendente', ()=>{
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jota!')
        cy.get(loc.MESSAGE.BTN_MSG).click()
        
        cy.get(loc.MENU.MOVIMENTACAO).click()
        
        cy.url().should('contains', '/movimentacao')

        cy.get(loc.MOVIMENTACAO.TIPO_DESPESA).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Despesa_01')
        cy.get(loc.MOVIMENTACAO.VALOR).type(1234)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Jota')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE.MSG).should('have.text', 'Movimentação inserida com sucesso!')
        cy.url().should('contains', '/extrato')

    })
    it('validar incluir despesa paga', ()=>{
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jota!')
        cy.get(loc.MESSAGE.BTN_MSG).click()
        
        cy.get(loc.MENU.MOVIMENTACAO).click()
        
        cy.url().should('contains', '/movimentacao')

        //cy.get('[data-test="menu-movimentacao"] > .fas').click()
        cy.get(loc.MOVIMENTACAO.TIPO_DESPESA).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Despesa_Paga_01')
        cy.get(loc.MOVIMENTACAO.VALOR).type(123)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Jota')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE.MSG).should('have.text', 'Movimentação inserida com sucesso!')
        cy.url().should('contains', '/extrato')

    })
    it('validar incluir despesa pendente, selecionando conta', ()=>{
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jota!')
        cy.get(loc.MESSAGE.BTN_MSG).click()
        
        cy.get(loc.MENU.MOVIMENTACAO).click()
        
        cy.url().should('contains', '/movimentacao')

        cy.get(loc.MOVIMENTACAO.TIPO_DESPESA).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Despesa_01')
        cy.get(loc.MOVIMENTACAO.VALOR).type(1234)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Jota')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para extrato')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE.MSG).should('have.text', 'Movimentação inserida com sucesso!')
        cy.url().should('contains', '/extrato')

    })
    it('validar incluir despesa paga', ()=>{
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jota!')
        cy.get(loc.MESSAGE.BTN_MSG).click()
        
        cy.get(loc.MENU.MOVIMENTACAO).click()
        
        cy.url().should('contains', '/movimentacao')

        cy.get(loc.MOVIMENTACAO.TIPO_DESPESA).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Despesa_Paga_01')
        cy.get(loc.MOVIMENTACAO.VALOR).type(123)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Jota')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para extrato') 
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE.MSG).should('have.text', 'Movimentação inserida com sucesso!')
        cy.url().should('contains', '/extrato')

    })
    it('validar excluir movimento', ()=>{
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jota!')
        cy.get(loc.MESSAGE.BTN_MSG).click()
        
        cy.get(loc.MENU.EXTRATO).click()
        
        
        cy.url().should('contains', '/extrato')

        cy.xpath(loc.EXTRATO.XP_BTN_EXCLUIR).first().click()

        
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Movimentação removida com sucesso!')
        
    })
})