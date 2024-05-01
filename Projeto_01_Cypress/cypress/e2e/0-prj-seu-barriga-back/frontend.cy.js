/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'


describe('login seu barriga', () => {
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login('jota@jota', 'senha errada')
        //cy.get(loc.MENU.HOME).click()
    })

    it('Validar responsividade', () => {
        cy.get('[data-test="menu-home"] > .fas').should('exists')
            .and('be.visible')
        cy.viewport(500, 700)
        cy.get('[data-test="menu-home"] > .fas').should('exists')
            .and('be.not.visible')

        cy.viewport('iphone-5')
        cy.get('[data-test="menu-home"] > .fas').should('exists')
            .and('be.not.visible')

        cy.viewport('ipad-2')
        cy.get('[data-test="menu-home"] > .fas').should('exists')
            .and('be.visible')
    })

    it('validar inserir uma conta', () => {
        cy.intercept({
            method: 'POST',
            url: '/contas'
        }, [
            { id: 1, nome: 'Conta de teste', visivel: true, usuario_id: 1 },
        ]
        ).as('SaveConta')

        cy.acessarMenuConta()
        cy.intercept({
            method: 'GET',
            url: '/contas'
        }, [
            { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
            { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
            { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 },
        ]
        ).as('contasSave')
    })

    it('validar alterar uma conta', () => {
        cy.intercept({
            method: 'GET',
            url: '/contas/**'
        }, [
            { id: 1, nome: 'Conta Alterada', visivel: true, usuario_id: 1 },

        ]
        ).as('contaAlterada')

        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Banco')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')


    })

    it('validar inserir conta repetida', () => {
        cy.intercept({
            method: 'GET',
            url: '/contas'
        }, { "error": "Ja existe uma conta com esse nome!", status: 400 }
        ).as('SaveContaMesmoNome')

        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('validar inserir movimentação', () => {
        cy.intercept({
            method: 'POST',
            url: '/transacoes'
        }, { "id": 1972305, "descricao": "Teste", "envolvido": "fdsf", "observacao": null, "tipo": "REC", "data_transacao": "2024-04-29T03:00:00.000Z", "data_pagamento": "2024-04-29T03:00:00.000Z", "valor": "1333.00", "status": false, "conta_id": 2103595, "usuario_id": 50248, "transferencia_id": null, "parcelamento_id": null }
        ).as('SaveContaMesmoNome')
        //---------
        cy.intercept({
            method: 'GET',
            url: '/extrato/**'
        }, { response: 'fixture:movimentacaoSalva' }
        )
        //---------
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('validar saldo', () => {
        cy.intercept({
            method: 'GET',
            url: '/trasacoes/**'
        }, [{
            "conta": "Conta para saldo",
            "id": 1972308,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-04-29T03:00:00.000Z",
            "data_pagamento": "2024-04-29T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 2103734,
            "usuario_id": 50248,
            "transferencia_id": null,
            "parcelamento_id": null
        }

        ])

        cy.intercept({
            method: 'PUT',
            url: '/trasacoes/**'
        }, [{
            "conta": "Conta para saldo",
            "id": 1972308,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-04-29T03:00:00.000Z",
            "data_pagamento": "2024-04-29T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 2103734,
            "usuario_id": 50248,
            "transferencia_id": null,
            "parcelamento_id": null
        }

        ])

        cy.get(loc.MENU.HOME).click()
        //cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.intercept({
            method: 'GET',
            url: '/saldo',
        }, [
            { conta_id: 999, conta: 'Carteira', saldo: '4.034,00' },
            { conta_id: 9909, conta: 'Banco', saldo: '100000.00' }
        ]
        ).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })

    it('Remever movimento', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/trasacoes/**'
        }, {
            response: {},
            status: 204
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO)('Movimento para exclusao')
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

    })

    it.only('validar dados para criar uma conta', () => {
        //const reqStub = cy.stub()

        cy.intercept({
            method: 'POST',
            url: '/contas'
        }, [
            {
                id: 1, nome: 'Conta de teste', visivel: true, usuario_id: 1,
                /* onRequest: req => {
                                    console.log()
                                    expect(req.request.body.nome).to.be.empty
                                    expect(req.request.headers).to.have.property('Authorization')}  }, */
                //onRequest: reqStub
            }]

        ).as('SaveConta')

        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: '/contas'
        }, [
            { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
            { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
            { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 },
        ]
        ).as('contasSave')
        cy.inserirConta('{CONTROL}')
        cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
       /*  cy.wait('@saveConta').then(() =>{
                expect(reqStub.args[0][0].request.body.nome).to.be.empty
                expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy */.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })
    it('Validar as cores', () => {

        cy.intercept({
            method: 'GET',
            url: '/extrato/**'
        }, [
            {
                "conta": "Conta para movimentacoes",
                "id": 1972306,
                "descricao": "Receita paga",
                "envolvido": "AAA",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-04-29T03:00:00.000Z",
                "data_pagamento": "2024-04-29T03:00:00.000Z",
                "valor": "-1500.00",
                "status": true,
                "conta_id": 2103732,
                "usuario_id": 50248,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta com movimentacao",
                "id": 1972307,
                "descricao": "Receita pendente",
                "envolvido": "BBB",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-04-29T03:00:00.000Z",
                "data_pagamento": "2024-04-29T03:00:00.000Z",
                "valor": "-1500.00",
                "status": false,
                "conta_id": 2103733,
                "usuario_id": 50248,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 1972308,
                "descricao": "Despesa paga",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2024-04-29T03:00:00.000Z",
                "data_pagamento": "2024-04-29T03:00:00.000Z",
                "valor": "3500.00",
                "status": true,
                "conta_id": 2103734,
                "usuario_id": 50248,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 1972309,
                "descricao": "Despesa pendente",
                "envolvido": "DDD",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2024-04-29T03:00:00.000Z",
                "data_pagamento": "2024-04-29T03:00:00.000Z",
                "valor": "-1000.00",
                "status": false,
                "conta_id": 2103734,
                "usuario_id": 50248,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        ]
        ).as('extrato')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')

    })

})