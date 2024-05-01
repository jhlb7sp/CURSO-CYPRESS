/// <reference types="cypress" />

import loc from '../../support/locators'

describe('login seu barriga', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
    })

    it('validar login com email e senha invalido', () => {
        //validar que esta na tela de login
        cy.url().should('contains', '/login')
        //informando login e senha inválido
        cy.get(loc.LOGIN.USER).type('invalido@invalido.com')
        cy.get(loc.LOGIN.PASSWORD).type('12345')
        cy.get(loc.LOGIN.BTN_LOGIN).click()
        //validar mensagem de erro
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Erro: Error: Request failed with status code 400')
    })
    it('validar login com senha invalida', ()=> {
        cy.url().should('contains', '/login')
        cy.get(loc.LOGIN.USER).type('jhb7sp@gmail.com')
        cy.get(loc.LOGIN.PASSWORD).type('Joaquim')
        cy.get(loc.LOGIN.BTN_LOGIN).click()
        //validar mensagem de erro
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Erro: Error: Request failed with status code 401')

    })

    it('validar login com senha valida', ()=> {
       
        cy.url().should('contains', '/login')
        cy.get(loc.LOGIN.USER).type('jota@jota');
        cy.get(loc.LOGIN.PASSWORD).type('jota');
        cy.get(loc.LOGIN.BTN_LOGIN).click()

        //validar mensagem
        cy.get(loc.MESSAGE.MSG).should('have.text', 'Bem vindo, Jorge Henrique!')
        cy.get(loc.MESSAGE.MSG).should('contain', 'Bem vindo')
    
    })
    it.only('Validar login com locator', () =>{
        cy.login('jota@jota', 'jota');
    })
})