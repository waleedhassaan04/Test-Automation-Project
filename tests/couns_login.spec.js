 import { test, expect } from '@playwright/test'
 import { LoginPage } from '../Pages/login'

test('login_successfully', async ({ page }) => {
    const Login = new LoginPage(page);
  
    await Login.gotoLoginPage('counsellor');
    await Login.login('test@mailinator.com', '123456');
    
});

test('empty-field', async ({ page }) => {
    const Login = new LoginPage(page);

    await Login.gotoLoginPage('counsellor');
    await page.waitForTimeout(1000);

    // No fields filled
    await Login.login('', '');
    await Login.expectErrorMessage('Please fill all the fields');

    // Email filled but no password
    await Login.login('test@mailinator.com', '');
    await Login.expectErrorMessage('Please fill all the fields');

    // Password filled but no email
    await Login.login('', '123456');
    await Login.expectErrorMessage('Please fill all the fields');
});

test('invalid-credential', async ({ page }) => {
    const Login = new LoginPage(page);

    await Login.gotoLoginPage('counsellor');
    await page.waitForTimeout(1000);

    // Correct Email - Wrong Password
    await Login.login('test@mailinator.com', '1234567');
    await Login.expectErrorMessage('Unable to log in with provided credentials.');

    // Unregistered Email - Correct Password
    await Login.login('test123@mailinator.com', '123456');
    await Login.expectErrorMessage('Unable to log in with provided credentials.');

    // Correct Email - Password character is less than 6
    await Login.login('test@mailinator.com', '12345');
    await Login.expectErrorMessage('Unable to log in with provided credentials.');
});

test('email validation', async ({ page }) => {
    const Login = new LoginPage(page);

    await Login.gotoLoginPage('counsellor');
    await page.waitForTimeout(1000);

    // missing '@'
    await Login.login('testmailinator.com', '123456');
    await Login.expectErrorMessage('Enter a valid email address');

    // wrongly placed '@'
    await Login.login('testmailinator.com@', '123456');
    await Login.expectErrorMessage('Enter a valid email address');

    // wrongly placed '@'
    await Login.login('@testmailinator.com', '123456');
    await Login.expectErrorMessage('Enter a valid email address');
    
    // missing '.'
    await Login.login('test@mailinatorcom', '123456');
    await Login.expectErrorMessage('Enter a valid email address');

    // no domain
    await Login.login('test@', '123456');
    await Login.expectErrorMessage('Enter a valid email address');

    // incomplete domain
    await Login.login('test@mailinator', '123456');
    await Login.expectErrorMessage('Enter a valid email address');

    // incomplete domain
    await Login.login('test@mailinator.c', '123456');
    await Login.expectErrorMessage('Enter a valid email address');
});

test('redirect', async ({ page }) => {
    const Login = new LoginPage(page);
    
    // Check Redirections - Blog, FAQ, Forgot pwd, Contact
    await Login.gotoLoginPage('counsellor');
    await Login.clickRedirect('counsellor');
});

test('faq_validations', async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.gotoLoginPage('counsellor');
    await Login.faq_validations();
});

test('forgot_pwd', async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.gotoLoginPage('counsellor');
    await Login.forgot_password();
});
