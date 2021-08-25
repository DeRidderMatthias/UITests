import { Selector } from 'testcafe';
fixture `1consult`
    .page `https://localhost:5001/`
    .beforeEach(async t => {
        await t
            .click('a[href="/Login"]')
            .typeText('form#account input[type="email"]', 'ConsulentMail')
            .typeText('form#account input[type="password"]', 'ConsulentPass')
            .click('form#account button[type="submit"]:not([form])');
    })
    .afterEach(async t => {
        await t
            .click('.nav-item > form > button[type="submit"]');
        await t.navigateTo('/Inputform/ClearTestData/0000000000');
    });

test('Empty field warnings', async t => {
    await t
        .click('form[action="/Inputform"] button[type=submit]')
        .click('form#form input[type="button"]')
        .expect(Selector('div.modal.show').exists).ok();
});
test('Create Consult', async t=>{
    await t.navigateTo('/Inputform/ClearTestData/0000000000');
    await t.navigateTo('/')
        .expect(Selector('div.card').withText("0000000000").find('tbody').find('tr').exists).notOk()
        .click('form[action="/Inputform"] button[type=submit]');
    await t.eval(()=>document.getElementById('KBO').value='0000000000');
    await t
        .typeText('form#form input[name="Boekhoudpakket"]','Boekhoudpakket #1')
        .typeText('form#form input[name="Managementpakket"]','Managementpakket #1')
        .click('form#form input[name="HasBioteelt"][type="checkbox"]')
        .typeText('form#form input[name="NietBiologischeStromen"]','Geen stromen beschikbaar op dit moment')
        .typeText('form#form input[name="Jaartal"]','2020')
        .typeText('form#form [name="OpmerkingenConsultAlgemeen"]','Geen opmerkingen beschikbaar op dit moment')
        .click('form#form input[type="button"]');
    await t
        .expect(Selector('form#form input[name="Boekhoudpakket"]').value).eql('Boekhoudpakket #1')
        .expect(Selector('form#form input[name="Managementpakket"]').value).eql('Managementpakket #1')
        .expect(Selector('form#form input[name="HasBioteelt"][type="checkbox"]').checked).ok()
        .expect(Selector('form#form input[name="NietBiologischeStromen"]').value).eql('Geen stromen beschikbaar op dit moment')
        .expect(Selector('form#form input[name="Jaartal"]').value).eql('2020')
        .expect(Selector('form#form [name="OpmerkingenConsultAlgemeen"]').value).eql('Geen opmerkingen beschikbaar op dit moment');
    await t.navigateTo('/')
        .expect(Selector('div.card').withText("0000000000").find("tbody").find('tr').exists).ok();
});
test('Create Consult Warning', async t=>{
    await t.navigateTo('/Inputform/ClearTestData/0000000000');
    await t.navigateTo('/')
        .expect(Selector('div.card').withText("0000000000").find("tbody").find('tr').exists).notOk()
        .click('form[action="/Inputform"] button[type=submit]');
    await t.eval(()=>document.getElementById('KBO').value='0000000000');
    await t
        .click('form#form input[name="HasBioteelt"][type="checkbox"]')
        .typeText('form#form input[name="Jaartal"]','2020')
        .typeText('form#form [name="OpmerkingenConsultAlgemeen"]','Geen opmerkingen beschikbaar op dit moment')
        .click('form#form input[type="button"]')
        .expect(Selector('div.modal.show').exists).ok()
        .click('div.modal.show button[name="submit"]');
    await t
        .expect(Selector('form#form input[name="HasBioteelt"][type="checkbox"]').checked).ok()
        .expect(Selector('form#form input[name="Jaartal"]').value).eql('2020')
        .expect(Selector('form#form [name="OpmerkingenConsultAlgemeen"]').value).eql('Geen opmerkingen beschikbaar op dit moment');
    await t.navigateTo('/')
        .expect(Selector('div.card').withText("0000000000").find("tbody").find('tr').exists).ok();
});