const buildEnv = () => {

    cy.intercept({
        method: 'POST',
        url: '/signin'
    }, {
        response: {
            id: 1000,
            nome: 'Usuário Falso',
            token: 'uma string com valor muito grande'
        }
    }).as('signin')

    cy.intercept({
        method: 'GET',
        url: '/saldo',
    }, [
        { conta_id: 999, conta: 'Carteira', saldo: '100.00' },
        { conta_id: 9909, conta: 'Banco', saldo: '100000.00' }
    ]
    ).as('saldo')

    cy.intercept({
        method: 'GET',
        url: '/contas'
    }, [
        { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
        { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
    ]
    ).as('contas')

    cy.intercept({
        method: 'GET',
        url: '/extrato/**'
    }, [
        {
            "conta": "Conta para movimentacoes",
            "id": 1972306,
            "descricao": "Movimentacao para exclusao",
            "envolvido": "AAA",
            "observacao": null,
            "tipo": "DESP",
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
            "descricao": "Movimentacao de conta",
            "envolvido": "BBB",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-04-29T03:00:00.000Z",
            "data_pagamento": "2024-04-29T03:00:00.000Z",
            "valor": "-1500.00",
            "status": true,
            "conta_id": 2103733,
            "usuario_id": 50248,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
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
        },
        {
            "conta": "Conta para saldo",
            "id": 1972309,
            "descricao": "Movimentacao 2, calculo saldo",
            "envolvido": "DDD",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-04-29T03:00:00.000Z",
            "data_pagamento": "2024-04-29T03:00:00.000Z",
            "valor": "-1000.00",
            "status": true,
            "conta_id": 2103734,
            "usuario_id": 50248,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para saldo",
            "id": 1972310,
            "descricao": "Movimentacao 3, calculo saldo",
            "envolvido": "EEE",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-04-29T03:00:00.000Z",
            "data_pagamento": "2024-04-29T03:00:00.000Z",
            "valor": "1534.00",
            "status": true,
            "conta_id": 2103734,
            "usuario_id": 50248,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para extrato",
            "id": 1972311,
            "descricao": "Movimentacao para extrato",
            "envolvido": "FFF",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-04-29T03:00:00.000Z",
            "data_pagamento": "2024-04-29T03:00:00.000Z",
            "valor": "-220.00",
            "status": true,
            "conta_id": 2103735,
            "usuario_id": 50248,
            "transferencia_id": null,
            "parcelamento_id": null
        }
    ]
    ).as('extrato')


}
export default buildEnv