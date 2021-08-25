import { Selector } from 'testcafe';

fixture `1Voederproductie`
    .page `https://localhost:5001/`
    .beforeEach(async t => {
        await t
            .click('a[href="/Login"]')
            .typeText('form#account input[type="email"]', 'ConsulentMail')
            .typeText('form#account input[type="password"]', 'ConsulentPass')
            .click('form#account button[type="submit"]:not([form])')
            .click(Selector('div.card').withText('0000000000').find('tbody tr .dropdown-item.btn').nth(0))
            .click('#inputnav li:nth-of-type(2) a');
    })
    .afterEach(async t => {
        await t
            .click('.nav-item > form > button[type="submit"]');
    });

test('before',async t=>{
    await t
        .click('a[href="/Login"]')
        .typeText('form#account input[type="email"]', 'ConsulentMail')
        .typeText('form#account input[type="password"]', 'ConsulentPass')
        .click('form#account button[type="submit"]:not([form])');
    await t
        .navigateTo('/Inputform/ClearTestData/0000000000');
    await t
        .navigateTo('/');
    await t
        .click('form[action="/Inputform"] button[type=submit]');
    await t.eval(()=>document.getElementById('KBO').value='0000000000');
    await t.click('form#form input[type="button"]')
        .click('div.modal.show button[name="submit"]');
}).before(async t=>{}).after(async t=>{});

test('Manage Teelten', async t => {
    await t
        .click('#teelten > .btn')
        .click('#select2-Naam-container')
        .click(Selector('.select2-results li').withText('Beweid grasland met klaver'))
        .click('.submitgroup .btn-primary')
        .click('#RequiredModal button[name="submit"]')
        .click(Selector('tr').withText('Beweid grasland met klaver').find('a.btn-outline-danger'))
        .click('#Confirm #ConfirmButton')
        .click('#inputnav li:nth-of-type(2) a')
        .expect(Selector('tr').withText('Beweid grasland met klaver').exists).notOk();
});

test('Edit Voederproductie', async t => {
    await t
        .typeText('textarea[name="Opmerkingen"]', 'dit is een opmerking', {
            replace: true
        })
        .click('.form-group > input[type="button"].btn-primary')
        .click('#RequiredModal button[name="submit"]');

    await t.eval(() => location.reload(true));

    await t
        .expect(Selector('textarea[name=\'Opmerkingen\']').value).match(/dit is een opmerking/i);
});

test('Edit Teelt', async t => {
    await t
        .click('#teelten > .btn')
        .click('#select2-Naam-container')
        .click(Selector('.select2-results li').withText('Beweid grasland met klaver'))
        .typeText('input[name="Oppervlakte"]', '300')
        .typeText('input[name="OppervlaktePermanentGrasland"]', '100')
        .typeText('input[name="ScheurPeriode"]', '3')
        .typeText('input[name="PercentKlaver"]', '40')
        .click('input[name="HasBodemanalyse"][type="checkbox"]')
        .click('select[name="Grondsoort"]')
        .click(Selector('select[name=\'Grondsoort\'] option').withText('Zandleem'))
        .typeText('input[name="PH"]', '8')
        .typeText('input[name="OrgKoolstof"]', '30')
        .expect(Selector('input[name=\'DrainageOppervlakte\']').visible).notOk()
        .click('input[name="HasDrainage"][type="checkbox"]')
        .typeText('input[name="DrainageOppervlakte"]', '50')
        .expect(Selector('input[name=\'ErosiePerceelOppervlakte\']').visible).notOk()
        .click('input[name="HasErosieGevoeligePercelen"][type="checkbox"]')
        .typeText('input[name="ErosiePerceelOppervlakte"]', '50')
        .typeText('input[name="Opbrengst"]', '100')
        .click('select[name="Opbrengsteenheid"]')
        .click(Selector('select[name=\'Opbrengsteenheid\'] option').withText('kg/ha'))
        .click('input[name="HasKuilanalyse"][type="checkbox"]')
        .typeText('input[name="DSPct"]', '20', {
            replace: true
        })
        .typeText('input[name="OEB"]', '30', {
            replace: true
        })
        .click('input[name="HasKuilanalyse"][type="checkbox"]')
        .expect(Selector('input[name=\'DSPct\']').value).notMatch(/20/)
        .expect(Selector('input[name=\'OEB\']')()).notMatch(/30/)
        .expect(Selector('input[name=\'DSPct\']').withAttribute('readonly').exists).ok()
        .expect(Selector('input[name=\'OEB\']').withAttribute('readonly').exists).ok()
        .typeText('input[name="VerkochteHoeveelheid"]', '20')
        .typeText('input[name="OogstRestenAfvoer"]', '21')
        .typeText('textarea[name="Opmerkingen"]', 'dit is een opmerking')
        .typeText('input[name="Derogatie"]', '24')
        .click('.submitgroup .btn-primary')
        .click('#RequiredModal button[name="submit"]')
        .click('#teelten a.btn-outline-warning')
        .expect(Selector('input[name=\'Oppervlakte\']').value).match(/300/)
        .expect(Selector('input[name=\'OppervlaktePermanentGrasland\']').value).match(/100/)
        .expect(Selector('input[name=\'ScheurPeriode\']').value).match(/3/)
        .expect(Selector('input[name=\'PercentKlaver\']').value).match(/40/)
        .expect(Selector('input[name=\'HasBodemanalyse\'][type=\'checkbox\']').value).match(/true/i)
        .expect(Selector('select[name=\'Grondsoort\']').value).match(/Zandleem/i)
        .expect(Selector('input[name=\'PH\']').value).match(/8/)
        .expect(Selector('input[name=\'OrgKoolstof\']').value).match(/30/)
        .expect(Selector('input[name=\'HasDrainage\'][type=\'checkbox\']').value).match(/true/i)
        .expect(Selector('input[name=\'DrainageOppervlakte\']').value).match(/50/)
        .expect(Selector('input[name=\'HasErosieGevoeligePercelen\'][type=\'checkbox\']').value).match(/true/i)
        .expect(Selector('input[name=\'ErosiePerceelOppervlakte\']').value).match(/50/)
        .expect(Selector('input[name=\'Opbrengst\']').value).match(/100/)
        .expect(Selector('select[name=\'Opbrengsteenheid\']').value).eql("kg/ha")
        .expect(Selector('input[name=\'DSPct\']').value).notMatch(/20/)
        .expect(Selector('input[name=\'OEB\']')()).notMatch(/30/)
        .expect(Selector('input[name=\'DSPct\']').withAttribute('readonly').exists).ok()
        .expect(Selector('input[name=\'OEB\']').withAttribute('readonly').exists).ok()
        .expect(Selector('input[name=\'VerkochteHoeveelheid\']').value).match(/20/)
        .expect(Selector('input[name=\'OogstRestenAfvoer\']').value).match(/21/)
        .expect(Selector('textarea[name=\'Opmerkingen\']').value).match(/dit is een opmerking/i)
        .expect(Selector('input[name=\'Derogatie\']').value).match(/24/);
});

test('Edit Bemesting', async t => {
    await t
        .click('#teelten > .btn')
        .click('#select2-Naam-container')
        .click(Selector('.select2-results li').withText('Beweid grasland zonder klaver'))
        .click('.submitgroup .btn-primary')
        .click('#RequiredModal button[name="submit"]')
        .click(Selector('tr').withText('Beweid grasland zonder klaver').find('a.btn-outline-warning'))
        .click('#bemesting > .form-group > .btn')
        .click('select[name="Organisch"]')
        .click(Selector('select[name="Organisch"] option').withText('Organisch'))
        .click('#select2-meststoffen-select-container')
        .click(Selector('.select2-results li').withText('Vaste mest runderen'))
        .click('select[name="Toedieningswijze"]')
        .click(Selector('select[name="Toedieningswijze"] option').withText('Onderploegen'))
        .typeText('input[name="N"]', '20.5')
        .typeText('input[name="P"]', '25.3')
        .typeText('input[name="K"]', '13.8')
        .click('label[for="defVal"]')
        .expect(Selector('input[name="N"]').value).match(/7.1/)
        .expect(Selector('input[name="P"]').value).match(/2.9/)
        .expect(Selector('input[name="K"]').value).match(/8.8/)
        .click('.submitgroup .btn-primary')
        .click('#RequiredModal button[name="submit"]')
        .expect(Selector('table[name="Bemesting"] tr').withText('Vaste mest runderen').exists).ok()
        .click(Selector('table[name="Bemesting"] tr').withText('Vaste mest runderen').find('.btn-outline-warning'))
        .expect(Selector('select[name="Organisch"]').value).match(/0/)
        .expect(Selector('span.select2-selection__rendered').innerText).match(/Vaste mest runderen/i)
        .expect(Selector('select[name="Toedieningswijze"]').value).match(/Onderploegen/i)
        .expect(Selector('input[name="N"]').value).match(/7.1/)
        .expect(Selector('input[name="P"]').value).match(/2.9/)
        .expect(Selector('input[name="K"]').value).match(/8.8/);
});

test('after',async t=>{
    await t
        .navigateTo('/Inputform/ClearTestData/0000000000');
}).before(async t=>{}).after(async t=>{});