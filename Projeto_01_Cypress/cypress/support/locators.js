const locators = {
    LOGIN:{
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTING: '[data-test="menu-settings"]',
        CONTA: 'Contas',
        MOVIMENTACAO: '[data-test="menu-movimentacao"] > .fas',
        EXTRATO: '[data-test="menu-extrato"] > .fas',
        RESET: '[href="/reset"]',
        HOME: '[data-test="menu-home"] > .fas'
    },
    CONTAS: {
        NOME:'[data-test="nome"]',
        BTN_SALVAR:'.btn',
        FN_XP_BTN_ALTERAR: nome => `//table//td[contains(.,'${nome}')]/..//i[@class='far fa-edit']`,
        XP_BTN_EXCLUIR: "//table//td[contains(.,'Alterando Campo 2')]/..//i[@class='far fa-trash-alt']"    
    },
    MOVIMENTACAO:{
        TIPO_DESPESA:   '[data-test="tipo-despesa"] > .fas',
        TIPO_RECEITA:   '[data-test="tipo-receita"] > .fas',
        DT_TRANS:       '[data-test="data-transacao"]',
        DT_PAG:         '[data-test="data-pagamento"]',
        DESCRICAO:      '[data-test="descricao"]',
        VALOR:          '[data-test="valor"]',
        INTERESSADO:    '[data-test="envolvido"]',
        CONTA:          '[data-test="conta"]',
        STATUS:         '[data-test="status"]',
        BTN_SALVAR:     '.btn-primary'      
    },

    EXTRATO: {
        XP_BTN_EXCLUIR: "//div[@class='list-group']//div[contains(.,'Despesa_01')]//div[@class='col col-md-1']/..//a[2]",
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(.,${desc})]/following-sibling::small[contains(., ${value})]`,
        FN_XP_REMOVER_ELEMENTO: "//span[contains(.,'Movimento para extrato')]/../../..//i[@class='far fa-trash-alt'",
        FN_XP_LINHA: desc => `//span[contains(.,'${desc}')]/../../../..`
    },
    SALDO:{
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,'${nome}')]/../td[2]`
    },

    MESSAGE: {
        MSG:'.toast-message',
        BTN_MSG: '.toast-info > .toast-close-button'
    } 

}

export default locators;