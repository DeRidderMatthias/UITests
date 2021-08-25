/// <reference types="cypress" />
import { url, kbo, boer, admin, consulent } from "./Variables";
describe("Klimrek_UserManagement", function () {
    this.beforeEach(function () {
        cy.viewport(1000, 1000);
        cy.visit(url);
        cy.get('a[href="/Login"]').click();
        cy.get('form#account input[type="email"]').type(admin.email);
        cy.get('form#account input[type="password"]').type(admin.password);
        cy.get('form#account button[type="submit"]:not([form])').click();
        cy.get('a[href="/Home/Users"]').click();
    });
    it("Can change org", function () {
        cy.get("tr:contains('ConsulentMail') a.detail-icon").click();
        cy.get("table.usertable").then(e => e[1]).find(".detail-view select.form-control").select("Innovatiesteunpunt");
        cy.get("table.usertable").then(e => e[1]).find(".detail-view .btn").click();
        cy.get("tr:contains('ConsulentMail') td:nth-of-type(3)").then(e => e[0].innerHTML).should("eq", "Innovatiesteunpunt");
        cy.get("tr:contains('ConsulentMail') a.detail-icon").click();
        cy.get("table.usertable").then(e => e[1]).find(".detail-view select.form-control").select("ILVO");
        cy.get("table.usertable").then(e => e[1]).find(".detail-view .btn").click();
        cy.get("tr:contains('ConsulentMail') td:nth-of-type(3)").then(e => e[0].innerHTML).should("eq", "ILVO");
    });
    it("Can change role", function () {
        cy.get("tr:contains('ConsulentMail') a.btn-outline-danger")
            .invoke('attr', 'href')
            .then(href => cy.visit(url + href.substr(1)));
        cy.get("table.usertable").then(e => e[1]).find("tr:contains('ConsulentMail')").should("not.exist");
        cy.get("div.bootstrap-table table.usertable tr:contains('ConsulentMail') select[name='u.Rol']").select("Landbouwer");
        cy.get("div.bootstrap-table table.usertable tr:contains('ConsulentMail') a.btn-success").click();
        cy.get("tr:contains('ConsulentMail') td:nth-of-type(4)").then(e => e[0].innerHTML).should("eq", "Landbouwer");
        cy.get("tr:contains('ConsulentMail') a.btn-outline-danger")
            .invoke('attr', 'href')
            .then(href => cy.visit(url + href.substr(1)));
        cy.get("table.usertable").then(e => e[1]).find("tr:contains('ConsulentMail')").should("not.exist");
        cy.get("div.bootstrap-table table.usertable tr:contains('ConsulentMail') select[name='u.Rol']").select("Consulent");
        cy.get("div.bootstrap-table table.usertable tr:contains('ConsulentMail') a.btn-success").click();
        cy.get("tr:contains('ConsulentMail') td:nth-of-type(4)").then(e => e[0].innerHTML).should("eq", "Consulent");
    });
});