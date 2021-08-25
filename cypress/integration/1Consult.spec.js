/// <reference types="cypress" />
import { url, kbo, boer, admin, consulent } from "./Variables";
function login(email, password) {
    cy.viewport(1000, 1000);
    cy.visit(url);
    cy.get('a[href="/Login"]').then(e => {
        cy.get(e).click();
        cy.get('form#account input[type="email"]').type(email);
        cy.get('form#account input[type="password"]').type(password);
        cy.get('form#account button[type="submit"]:not([form])').click();
    });
}
function logout() {
    cy.visit(url);
    cy.get('.nav-item > form > button[type="submit"]').click();
}
describe('Consult Algemeen', function () {
    after(() => {
        login(consulent.email, consulent.password);
        cy.request(url + 'Inputform/ClearTestData/' + kbo);
    });
    beforeEach(() => {
        login(consulent.email, consulent.password);
    });
    afterEach(() => {
        logout();
    })
    it('Empty field warnings', function () {
        var currentkbo;
        cy.get('form[action="/Inputform"] select[name="subscription"] option:selected')
            .then((btn) => { currentkbo = btn.text().substr(0, 10); })
            .then(() => {
                cy.get('form[action="/Inputform"] button[type=submit]').click();
                cy.get('input[name="KBO"]').should('have.value', currentkbo);
                cy.get('form#form input[name="Boekhoudpakket"]').clear();
                cy.get('form#form input[type="button"]').click();
                cy.get('div.modal.show');
            });
    });
    it('CreateConsult', function () {
        var currentkbo;
        var testconsults = 0;
        //get start length
        cy.get('body').then((a) => {
            if (a.find(`table:contains(${kbo})`).length) {
                cy.get(`table:contains(${kbo})`).children('tbody').children('tr').then(e => testconsults = e.length);
            }
        });
        //create new consult
        cy.get('form[action="/Inputform"] select[name="subscription"] option:selected')
            .then((btn) => { currentkbo = btn.text().substr(0, 10); })
            .then(() => {
                cy.get('form[action="/Inputform"] button[type=submit]').click();
                cy.get('input[name="KBO"]').should('have.value', currentkbo);
                cy.get('form#form input[name="KBO"]').invoke('val', kbo);
                cy.get('form#form input[name="Boekhoudpakket"]').type('Boekhoudpakket #1');
                cy.get('form#form input[name="Managementpakket"]').type('Managementpakket #1');
                cy.get('form#form input[name="HasBioteelt"][type="checkbox"]').check();
                cy.get('form#form input[name="NietBiologischeStromen"]').type('Geen stromen beschikbaar op dit moment');
                cy.get('form#form input[name="Jaartal"]').type('2020');
                cy.get('form#form [name="OpmerkingenConsultAlgemeen"]').type('Geen opmerkingen beschikbaar op dit moment');
                cy.get('form#form input[type="button"]').click();
            });
        //check newly created consult
        cy.get('form#form input[name="Boekhoudpakket"]').should('have.value', 'Boekhoudpakket #1');
        cy.get('form#form input[name="Managementpakket"]').should('have.value', 'Managementpakket #1');
        cy.get('form#form input[name="HasBioteelt"][type="checkbox"]').should('be.checked');
        cy.get('form#form input[name="NietBiologischeStromen"]').should('have.value', 'Geen stromen beschikbaar op dit moment');
        cy.get('form#form input[name="Jaartal"]').should('have.value', '2020');
        cy.get('form#form [name="OpmerkingenConsultAlgemeen"]').should('have.value', 'Geen opmerkingen beschikbaar op dit moment');
        //check consult in homepage
        cy.visit(url);
        cy.get(`table:contains(${kbo})`).children('tbody').children('tr')
            .then((e) => expect(testconsults + 1).to.eq(e.length));
    });
    it('CreateConsult Warning', function () {
        var currentkbo;
        var testconsults = 0;
        //get start length
        cy.get('body').then((a) => {
            if (a.find(`table:contains(${kbo})`).length) {
                cy.get(`table:contains(${kbo})`).children('tbody').children('tr').then(e => testconsults = e.length);
            }
        });
        //create new consult
        cy.get('form[action="/Inputform"] select[name="subscription"] option:selected')
            .then((btn) => { currentkbo = btn.text().substr(0, 10); })
            .then(() => {
                cy.get('form[action="/Inputform"] button[type=submit]').click();
                cy.get('input[name="KBO"]').should('have.value', currentkbo);
                cy.get('form#form input[name="KBO"]').invoke('val', kbo);
                cy.get('form#form input[name="Boekhoudpakket"]').clear();
                cy.get('form#form input[name="Managementpakket"]').clear();
                cy.get('form#form input[name="HasBioteelt"][type="checkbox"]').check();
                cy.get('form#form input[name="NietBiologischeStromen"]').clear();
                cy.get('form#form input[name="Jaartal"]').type('2020');
                cy.get('form#form [name="OpmerkingenConsultAlgemeen"]').type('Geen opmerkingen beschikbaar op dit moment');
                cy.get('form#form input[type="button"]').click();
                cy.get('div.modal.show button[name="submit"]').click();
            });
        //check newly created consult
        cy.get('form#form input[name="Boekhoudpakket"]').should('be.empty');
        cy.get('form#form input[name="Managementpakket"]').should('be.empty');
        cy.get('form#form input[name="HasBioteelt"][type="checkbox"]').should('be.checked');
        cy.get('form#form input[name="NietBiologischeStromen"]').should('be.empty');
        cy.get('form#form input[name="Jaartal"]').should('have.value', '2020');
        cy.get('form#form [name="OpmerkingenConsultAlgemeen"]').should('have.value', 'Geen opmerkingen beschikbaar op dit moment');
        //check consult in homepage
        cy.visit(url);
        cy.get(`table:contains(${kbo})`).children('tbody').children('tr')
            .then((e) => expect(testconsults + 1).to.eq(e.length));
    });
});