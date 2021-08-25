import { Selector } from 'testcafe';

fixture `1Consult`
    .page `https://localhost:5001/`
    .beforeEach(async t => {
        await t
            .click('a[href="/Login"]')
            .typeText('form#account input[type="email"]', 'AdminMail')
            .typeText('form#account input[type="password"]', 'AdminPass')
            .click('form#account button[type="submit"]:not([form])')
            .click('a[href="/Home/Users"]');
    });

test('Can change org', async t => {
    await t
        .click(Selector('tr').withText('ConsulentMail').find('a.detail-icon'))
        .click(Selector('table.usertable').nth(1).find('.detail-view select.form-control'))
        .click(Selector('table.usertable').nth(1).find('.detail-view select.form-control').child((node, index, originNode) => {
            return node.innerHTML=="Innovatiesteunpunt";
        }))
        .click(Selector('table.usertable').nth(1).find('.detail-view .btn'))
        .expect(Selector('tr').withText('ConsulentMail').find('td:nth-of-type(4)').innerText).match(/Innovatiesteunpunt/i)
        .click(Selector('tr').withText('ConsulentMail').find('a.detail-icon'))
        .click(Selector('table.usertable').nth(1).find('.detail-view select.form-control'))
        .click(Selector('table.usertable').nth(1).find('.detail-view select.form-control').child((node, index, originNode) => {
            return node.innerHTML=="ILVO";
        }))
        .click(Selector('table.usertable').nth(1).find('.detail-view .btn'))
        .expect(Selector('tr').withText('ConsulentMail').find('td:nth-of-type(4)').innerText).match(/ILVO/i);
});

test('Can change role', async t => {
    await t
        .click(Selector('tr').withText('ConsulentMail').find('a.btn-outline-danger'))
        .expect(Selector('table.usertable').nth(1).find((node, index, originNode) => {
            return node.tagName=="TR"&&node.innerHTML.includes("ConsulentMail");
        }).exists).notOk()
        .click(Selector('div.bootstrap-table table.usertable tr').withText('ConsulentMail').find('select[name=\'u.Rol\']'))
        .click(Selector('div.bootstrap-table table.usertable tr').withText('ConsulentMail').find('select[name=\'u.Rol\']').child((node, index, originNode) => {
            return node.innerHTML=="Landbouwer";
        }))
        .click(Selector('div.bootstrap-table table.usertable tr').withText('ConsulentMail').find('a.btn-success'))
        .expect(Selector('tr').withText('ConsulentMail').find('td:nth-of-type(5)').nth(0).innerText).match(/Landbouwer/i)
        .click(Selector('tr').withText('ConsulentMail').find('a.btn-outline-danger'))
        .expect(Selector('table.usertable').nth(1).find('tr').withText('ConsulentMail').exists).notOk()
        .click(Selector('div.bootstrap-table table.usertable tr').withText('ConsulentMail').find('select[name=\'u.Rol\']'))
        .click(Selector('div.bootstrap-table table.usertable tr').withText('ConsulentMail').find('select[name=\'u.Rol\']').child((node, index, originNode) => {
            return node.innerHTML=="Consulent";
        }))
        .click(Selector('div.bootstrap-table table.usertable tr').withText('ConsulentMail').find('a.btn-success'))
        .expect(Selector('tr').withText('ConsulentMail').find('td:nth-of-type(5)').nth(0).innerText).match(/Consulent/i);
});