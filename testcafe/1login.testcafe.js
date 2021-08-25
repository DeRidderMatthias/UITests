import { Selector, ClientFunction } from 'testcafe';

fixture `1Login`
    .page `https://localhost:5001`;

test('Login validation errors', async t => {
    await t
        .click('a[href="/Login"]')
        .typeText('form#account input[type="email"]', 'a', {
            replace: true
        })
        .click('body')
        .expect(Selector('form#account span.field-validation-error #Input_Email-error').visible).ok()
        .typeText('form#account input[type="email"]', 'valid@mail.com', {
            replace: true
        })
        .typeText('form#account input[type="password"]', 'Testpass1!', {
            replace: true
        })
        .click('form#account button[type="submit"]:not([form])')
        .expect(Selector('div.validation-summary-errors').visible).ok();
});

test('Login success admin', async t => {
    await t
        .click('a[href="/Login"]')
        .typeText('form#account input[type="email"]', 'AdminMail')
        .typeText('form#account input[type="password"]', 'AdminPass')
        .click('form#account button[type="submit"]:not([form])')
        .expect(Selector('a[href="/Manage"]').innerText).match(/AdminMail/i);

    const GetTitle = ClientFunction(() => {
        return document.title;
    });

    await t
        .expect(GetTitle()).match(/Homepage Admin/i)
        .click('.nav-item > form > button[type="submit"]');
});

test('Login success consulent', async t => {
    await t
        .click('a[href="/Login"]')
        .typeText('form#account input[type="email"]', 'ConsulentMail')
        .typeText('form#account input[type="password"]', 'ConsulentPass')
        .click('form#account button[type="submit"]:not([form])')
        .expect(Selector('a[href="/Manage"]').innerText).match(/ConsulentMail/i);

    const GetTitle = ClientFunction(() => {
        return document.title;
    });

    await t
        .expect(GetTitle()).match(/Homepage Consultant/i)
        .click('.nav-item > form > button[type="submit"]');
});

test('Login success boer', async t => {
    await t
        .click('a[href="/Login"]')
        .typeText('form#account input[type="email"]', 'BoerMail')
        .typeText('form#account input[type="password"]', 'BoerPass')
        .click('form#account button[type="submit"]:not([form])')
        .expect(Selector('a[href="/Manage"]').innerText).match(/BoerMail/i)
        .click('.nav-item > form > button[type="submit"]');
});

test('Logout success', async t => {
    await t
        .click('a[href="/Login"]')
        .typeText('form#account input[type="email"]', 'ConsulentMail')
        .typeText('form#account input[type="password"]', 'ConsulentPass')
        .click('form#account button[type="submit"]:not([form])')
        .expect(Selector('a[href="/Manage"]').innerText).match(/ConsulentMail/i)
        .click('.nav-item > form > button[type="submit"]');

    const GetTitle = ClientFunction(() => {
        return document.title;
    });

    await t
        .expect(GetTitle()).match(/Login/i)
        .expect(Selector('a[href="/Manage"]').exists).notOk();
});