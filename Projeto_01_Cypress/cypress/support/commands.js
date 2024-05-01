// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loc from "./locators";

Cypress.Commands.add('login', (user, passwd) =>{
    
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.url().should('contains', '/login')
    cy.get(loc.LOGIN.USER).type(user);
    cy.get(loc.LOGIN.PASSWORD).type(passwd);
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    
})
Cypress.Commands.add('resetApp', () =>{
    cy.get(loc.MENU.SETTING).click()
    cy.get(loc.MENU.RESET).click()
    cy.get('.toast-success > .toast-close-button').click()
})
Cypress.Commands.add('getToken',(user, passwd) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body:{
            email: user,
            redirecionar: false,
            senha:passwd,
            status: 200
        }        
    }).its('body.token').should('not.be.empty')
        .then(token =>{
            Cypress.env('token', token)
            return token
        })
})

Cypress.Commands.add('resetRest', () => {
    cy.getToken('jota@jota', 'jota').then(token => {
        cy.request({
            url: '/reset',
            method: 'GET',
            headers: {Authorization: `JWT ${token}`}
        }).its('status').should('be.equal', 200)
    })
})

Cypress.Commands.add('getBuscarConta', nomeConta => {
    cy.getToken('jota@jota', 'jota').then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                    nome: nomeConta
            }
        }).then(res => {
            return res.body[0].id
        })
    })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) =>{
    if(options.length === 1){
        if(Cypress.env('token')){
           options[0].headers = {
               Authorization: `JWT ${Cypress.env('token')}`

           }
        }
    }
    return originalFn(...options)
})
