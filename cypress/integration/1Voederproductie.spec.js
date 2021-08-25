/// <reference types="cypress" />
import { url, kbo, boer, admin, consulent } from "./Variables";
function login(email, password) {
    cy.viewport(1000, 1000);
    cy.visit(url);
    cy.get('a[href="/Login"]').then(e => {
        if (e != undefined) {
            cy.get(e).click();
            cy.get('form#account input[type="email"]').type(email);
            cy.get('form#account input[type="password"]').type(password);
            cy.get('form#account button[type="submit"]:not([form])').click();
        }
    });
}
function logout() {
    cy.visit(url);
    cy.get('.nav-item > form > button[type="submit"]').click();
}
describe('Klimrek_Voederproductie', function () {
    before(() => {
        login(consulent.email, consulent.password);
        cy.get('form[action="/Inputform"] button[type=submit]').click();
        cy.get('form#form input[name="KBO"]').invoke('val', kbo);
        cy.get('form#form input[type="button"]').click();
        cy.get('div.modal.show button[name="submit"]').click();
        logout();
    })
    beforeEach(() => {
        login(consulent.email, consulent.password);
        cy.wait(500);
        cy.get(`table:contains(${kbo}) tbody tr .dropdown-item.btn`).first().click();
        cy.get(`#inputnav li:nth-of-type(2) a`).click();
    })
    afterEach(() => {
        logout();
    })
    after(() => {
        login(consulent.email, consulent.password);
        cy.request(url + 'Inputform/ClearTestData/' + kbo);
    })
    it('Manage Teelten', function () {
        cy.get(`#teelten > .btn`).click();
        cy.get(`#select2-Naam-container`).click();
        cy.get(`.select2-results li:contains('Beweid grasland met klaver')`).click();
        cy.get(`.submitgroup .btn-primary`).click();
        cy.get(`#RequiredModal button[name='submit']`).click();
        cy.wait(500);
        cy.get('tr:contains("Beweid grasland met klaver") a.btn-outline-danger').click();
        cy.get(`#Confirm #ConfirmButton`).click();
        cy.get(`#inputnav li:nth-of-type(2) a`).click();
        cy.get('tr:contains("Beweid grasland met klaver") a.btn-outline-danger').should("not.exist");
    })
    it('Edit Voederproductie', function () {
        cy.get(`textarea[name='Opmerkingen']`).clear().type('dit is een opmerking');
        cy.get(`.form-group > input[type='button'].btn-primary`).click();
        cy.get(`#RequiredModal button[name='submit']`).click();
        cy.reload();
        cy.get(`textarea[name='Opmerkingen']`).should('have.value', 'dit is een opmerking');
    })
    it('Edit Teelt', function () {
        cy.get(`#teelten > .btn`).click();
        cy.get(`#select2-Naam-container`).click();
        cy.get(`.select2-results li:contains('Beweid grasland met klaver')`).click();
        cy.get(`input[name='Oppervlakte']`).type('300');
        cy.get(`input[name='OppervlaktePermanentGrasland']`).type('100');
        cy.get(`input[name='ScheurPeriode']`).type('3');
        cy.get(`input[name='PercentKlaver']`).type('40');
        cy.get(`input[name='HasBodemanalyse'][type='checkbox']`).check();
        cy.get(`select[name='Grondsoort']`).select('Zandleem');
        cy.get(`input[name='PH']`).type('8');
        cy.get(`input[name='OrgKoolstof']`).type('30');
        cy.get(`input[name='HasDrainage'][type='checkbox']`).uncheck();
        cy.get(`input[name='DrainageOppervlakte']`).should('not.be.visible');
        cy.get(`input[name='HasDrainage'][type='checkbox']`).check();
        cy.get(`input[name='DrainageOppervlakte']`).type('50');
        cy.get(`input[name='HasErosieGevoeligePercelen'][type='checkbox']`).uncheck();
        cy.get(`input[name='ErosiePerceelOppervlakte']`).should('not.be.visible');
        cy.get(`input[name='HasErosieGevoeligePercelen'][type='checkbox']`).check();
        cy.get(`input[name='ErosiePerceelOppervlakte']`).type('50');
        cy.get(`input[name='Opbrengst']`).type('100');
        cy.get(`select[name='Opbrengsteenheid']`).select('kg/ha');
        cy.get(`input[name='HasKuilanalyse'][type='checkbox']`).check();
        cy.get(`input[name='DSPct']`).clear().type('20');
        cy.get(`input[name='OEB']`).clear().type('30');
        cy.get(`input[name='HasKuilanalyse'][type='checkbox']`).uncheck();
        cy.get(`input[name='DSPct']`).should('not.eq', 20).should('have.attr', 'readonly', 'readonly');
        cy.get(`input[name='OEB']`).should('not.eq', 30).should('have.attr', 'readonly', 'readonly');
        cy.get(`input[name='VerkochteHoeveelheid']`).type('20');
        cy.get(`input[name='OogstRestenAfvoer']`).type('21');
        cy.get(`textarea[name='Opmerkingen']`).type('dit is een opmerking');
        cy.get(`input[name='Derogatie']`).type('24');
        cy.get(`.submitgroup .btn-primary`).click();
        cy.get(`#RequiredModal button[name='submit']`).click();
        //check teelt values
        cy.wait(500);
        cy.get(`#teelten a.btn-outline-warning`).click();
        cy.get(`input[name='Oppervlakte']`).should('have.value', '300');
        cy.get(`input[name='OppervlaktePermanentGrasland']`).should('have.value', '100');
        cy.get(`input[name='ScheurPeriode']`).should('have.value', '3');
        cy.get(`input[name='PercentKlaver']`).should('have.value', '40');
        cy.get(`input[name='HasBodemanalyse'][type='checkbox']`).should('be.checked');
        cy.get(`select[name='Grondsoort']`).should('have.value', 'Zandleem');
        cy.get(`input[name='PH']`).should('have.value', '8');
        cy.get(`input[name='OrgKoolstof']`).should('have.value', '30');
        cy.get(`input[name='HasDrainage'][type='checkbox']`).should('be.checked');
        cy.get(`input[name='DrainageOppervlakte']`).should('have.value', '50');
        cy.get(`input[name='HasErosieGevoeligePercelen'][type='checkbox']`).should('be.checked');
        cy.get(`input[name='ErosiePerceelOppervlakte']`).should('have.value', '50');
        cy.get(`input[name='Opbrengst']`).should('have.value', '100');
        cy.get(`select[name='Opbrengsteenheid']`).should('have.value', 'kg/ha');
        cy.get(`input[name='DSPct']`).should('not.eq', 20).should('have.attr', 'readonly', 'readonly');
        cy.get(`input[name='OEB']`).should('not.eq', 30).should('have.attr', 'readonly', 'readonly');
        cy.get(`input[name='VerkochteHoeveelheid']`).should('have.value', '20');
        cy.get(`input[name='OogstRestenAfvoer']`).should('have.value', '21');
        cy.get(`textarea[name='Opmerkingen']`).should('have.value', 'dit is een opmerking');
        cy.get(`input[name='Derogatie']`).should('have.value', '24');
    });
    it("Edit bemesting", function () {
        cy.get(`#teelten > .btn`).click();
        cy.get(`#select2-Naam-container`).click();
        cy.get(`.select2-results li:contains('Beweid grasland zonder klaver')`).click();
        cy.get(`.submitgroup .btn-primary`).click();
        cy.get(`#RequiredModal button[name='submit']`).click();
        cy.wait(500);
        cy.get('tr:contains("Beweid grasland zonder klaver") a.btn-outline-warning').click();
        //edit bemesting
        cy.get(`#bemesting > .form-group > .btn`).click();
        cy.get(`select[name="Organisch"]`).select('Organisch');
        cy.get(`select#meststoffen-select`).select("Vaste mest runderen", { force: true });
        cy.get(`select[name="Toedieningswijze"]`).select("Onderploegen");
        cy.get(`input[name="N"]`).type("20.5");
        cy.get(`input[name="P"]`).type("25.3");
        cy.get(`input[name="K"]`).type("13.8");
        cy.get(`input[type="checkbox"][name="defVal"]`).click({ force: true });
        cy.get(`input[name="N"]`).should("have.value", "7.1");
        cy.get(`input[name="P"]`).should("have.value", "2.9");
        cy.get(`input[name="K"]`).should("have.value", "8.8");
        cy.get(`.submitgroup .btn-primary`).click();
        cy.get(`#RequiredModal button[name='submit']`).click();
        cy.get(`table[name="Bemesting"] tr:contains("Vaste mest runderen")`).should("exist");
        cy.get(`table[name="Bemesting"] tr:contains("Vaste mest runderen") .btn-outline-warning`).click();
        cy.get(`select[name="Organisch"]`).should("have.value", '0');
        cy.get(`span.select2-selection__rendered`).should("contain", "Vaste mest runderen");
        cy.get(`select[name="Toedieningswijze"]`).should("have.value", "Onderploegen");
        cy.get(`input[name="N"]`).should("have.value", "7.1");
        cy.get(`input[name="P"]`).should("have.value", "2.9");
        cy.get(`input[name="K"]`).should("have.value", "8.8");
    });
})