import { test, expect } from '@playwright/test'
import { LoginPage } from '../Pages/login'

test('register_successfully', async ({ page }) => {
    const Register = new LoginPage(page);

    const randomEmail = `patient${Date.now()}@mailinator.com`;

    await Register.gotoRegisterPage();
    await Register.register('Patient xyz', randomEmail, 'Employees', '123456', '123456');
});

test('empty-field', async ({ page }) => {
    const Register = new LoginPage(page);

    await Register.gotoRegisterPage();

    // No fields filled
    await Register.register('', '', '', '', '');
    await Register.expectErrorMessage('Please fill all the fields');

    // Name missing
    await Register.register('', 'patient@mailinator.com', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Please fill all the fields');

    // Email missing
    await Register.register('Patient', '', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Please fill all the fields');

    // Subsidiary missing
    await Register.register('Patient', 'patient@mailinator.com', '', '123456', '123456');
    await Register.expectErrorMessage('Please fill all the fields');

    // Password missing
    await Register.register('Patient', 'patient@mailinator.com', 'Employees', '', '123456');
    await Register.expectErrorMessage('Please fill all the fields');

    // Confirm Password missing
    await Register.register('Patient', 'patient@mailinator.com', 'Employees', '123456', '');
    await Register.expectErrorMessage('Please fill all the fields');

    //Checkbox not checked
    await Register.register('Patient', 'patient@mailinator.com', 'Employees', '123456', '123456', false);
    await Register.expectErrorMessage('Please check our Terms and condition');
});

test('pwd_validation', async ({ page }) => {
    const Register = new LoginPage(page);

    await Register.gotoRegisterPage();
    // Password character is less than 6
    await Register.register('Patient', 'patient@mailinator.com', 'Employees', '12345', '12345');
    await Register.expectErrorMessage('Ensure password / confirm password fields has at least 6 characters.');

    // Password & Confirm Password doesn't match
    await Register.register('Patient', 'patient@mailinator.com', 'Employees', '123456', '987654');;
    await Register.expectErrorMessage('The passwords do not match.');

});

test('email_validation', async ({ page }) => {
    const Register = new LoginPage(page);

    await Register.gotoRegisterPage();

    // Email Already Registered
    await Register.register('patient', 'patient@mailinator.com', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('The email address is already associated with another account.');

    // missing '@'
    await Register.register('patient', 'patientmailinator.com', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Enter a valid email address');

    // wrongly placed '@'
    await Register.register('patient', 'patientmailinator.com@', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Enter a valid email address');

    // wrongly placed '@'
    await Register.register('patient', '@patientmailinator.com', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Enter a valid email address');

    // missing '.'
    await Register.register('patient', 'patient@mailinatorcom', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Enter a valid email address');

    // no domain
    await Register.register('patient', 'patient@', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Enter a valid email address');

    // incomplete domain
    await Register.register('patient', 'patient@mailinator', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Enter a valid email address');

    // incomplete domain
    await Register.register('patient', 'patient@mailinator.c', 'Employees', '123456', '123456');
    await Register.expectErrorMessage('Enter a valid email address');
});

test('redirect', async ({ page }) => {
    const Register = new LoginPage(page);

    // Check Redirections - Blog, faq, Terms & Cond, Sign In, Contact
    await Register.gotoRegisterPage();
    await Register.reg_redirect();
});
