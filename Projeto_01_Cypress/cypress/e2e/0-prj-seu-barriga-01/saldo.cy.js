/// <reference types='cypress' />
import loc from '../../support/locators'

describe('Movimentação de conta', () =>{
    beforeEach(() =>{
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('jota@jota', 'jota');
    })
    it('Validar calcular saldo', () => {
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo'))
            .should('contain', '534,00')

    })

})