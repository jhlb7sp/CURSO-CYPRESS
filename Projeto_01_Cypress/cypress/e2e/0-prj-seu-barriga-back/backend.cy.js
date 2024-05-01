/// <reference types="cypress" />
const dayjs = require('dayjs')

describe('login seu barriga', () => {
   // let token
    beforeEach(() => {
        cy.getToken('jota@jota', 'jota')
           /*  .then(tkn => {
                token = tkn
            }) */
        cy.resetRest()
    })
    it('validar inserir conta', () => {
        cy.request({
            url: '/contas/',
            method: 'POST',
            //headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta via REST 2'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via REST 2')

        })
    })

    it('Validar alterar conta', () => {
        cy.getBuscarConta('Conta para alterar')
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    //headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'conta alterada via rest'
                    }
                }).as('response')
                cy.get('@response').its('status').should('be.equal', 200)

            })

    })
    it('validar inserir conta repetida', () => {
        cy.request({
            url: '/contas/',
            method: 'POST',
            //headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')

        })
    })
    it('Validar inserir uma movimentação', () => {
        cy.getBuscarConta('Conta para movimentacoes')
            .then(ContaId => {
                cy.request({
                    url: '/transacoes',
                    method: 'POST',
                    //headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: ContaId,
                        data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        data_transacao: dayjs().format('DD/MM/YYYY'),
                        descricao: 'Movimento via rest',
                        envolvido: 'Jota',
                        status: true,
                        tipo: 'REC',
                        valor: '10'
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Validar Saldo', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            url: '/transacoes',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }

        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)

        })

        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })

    })
    it('Excluir trasação', () => {
        cy.request({
            url: '/transacoes',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
            //    headers: { Authorization: `JWT ${token}` },
            }).its('status').should('be.equal', 204)
        })
    })
})