/// <reference types="cypress" />
import { url, kbo, boer, admin, consulent } from "./Variables";

function login(email, password) {
    cy.viewport(1000, 1000);
    cy.visit(url);
    cy.get('a[href="/Login"]').click();
    cy.get('form#account input[type="email"]').type(email);
    cy.get('form#account input[type="password"]').type(password);
    cy.get('form#account button[type="submit"]:not([form])').click();
}
function logout() {
    cy.visit(url);
    cy.get('.nav-item > form > button[type="submit"]').click();
}
describe('Klimrek_Login', function () {
    it('Login validation errors', function () {
        cy.visit(url);
        cy.get('a[href="/Login"]').click();
        cy.get('form#account input[type="email"]').type('a').blur();
        cy.get('form#account span.field-validation-error #Input_Email-error');
        cy.get('form#account input[type="email"]').clear().type('valid@mail.com');
        cy.get('form#account input[type="password"]').type('Testpass1!');
        cy.get('form#account button[type="submit"]:not([form])').click();
        cy.get('div.validation-summary-errors');
    });
    it('Login success admin', function () {
        login(admin.email, admin.password);
        cy.get('a[href="/Manage"]').invoke('text')
            .should((content) => expect(content.toLowerCase()).to.include(admin.email.toLowerCase()));
        cy.title().should('include', 'Startpagina admin');
        cy.getCookie('.AspNetCore.Identity.Application')
            .should('have.property', 'value')
            .then((cookie) => { expect(cookie).not.to.be.null.and.not.to.be.undefined.and.not.to.eq('') });
        logout();
    });
    it('Login success consulent', function () {
        login(consulent.email, consulent.password);
        cy.get('a[href="/Manage"]').invoke('text')
            .should((content) => expect(content.toLowerCase()).to.include(consulent.email.toLowerCase()));
        cy.title().should('include', 'Startpagina consulent');
        cy.getCookie('.AspNetCore.Identity.Application')
            .should('have.property', 'value')
            .then((cookie) => { expect(cookie).not.to.be.null.and.not.to.be.undefined.and.not.to.eq('') });
        logout();
    });
    it('Login success boer', function () {
        login(boer.email, boer.password);
        cy.get('a[href="/Manage"]').invoke('text')
            .should((content) => expect(content.toLowerCase()).to.include(boer.email.toLowerCase()));
        cy.getCookie('.AspNetCore.Identity.Application')
            .should('have.property', 'value')
            .then((cookie) => { expect(cookie).not.to.be.null.and.not.to.be.undefined.and.not.to.eq('') });
        logout();
    });
    it('Logout success', function () {
        login(consulent.email, consulent.password);
        cy.get('a[href="/Manage"]').invoke('text')
            .should((content) => expect(content.toLowerCase()).to.include(consulent.email.toLowerCase()));
        cy.getCookie('.AspNetCore.Identity.Application')
            .should('have.property', 'value')
            .then((cookie) => { expect(cookie).not.to.be.null.and.not.to.be.undefined.and.not.to.eq('') });
        logout();
        cy.title().should('include', 'Inloggen');
        cy.get('a[href="/Manage"]')
            .should('not.exist');
        cy.getCookie('.AspNetCore.Identity.Application')
            .should('be.null');
    });
})