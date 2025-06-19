import { test, expect } from '@playwright/test'
import { LoginPage } from '../Pages/login'
import { P_HomePage } from '../Pages/patient_home'
import { C_HomePage } from '../Pages/couns_home'


test.beforeEach('login_successfully', async ({ page }, testInfo) => {
    const Login = new LoginPage(page);
    if (testInfo.title === 'no_relation'){
        await Login.gotoLoginPage('patient');
        await Login.login('patient@mailinator.com', '123456');
    }
    else if(testInfo.title === 'subscription'){
        await Login.gotoLoginPage('s_patient');
        await Login.login('patient@mailinator.com', '123456');
    }
    else{
        await Login.gotoLoginPage('patient');
        await Login.login('patient@mailinator.com', '123456');
    }
});

test('session_options', async ({ context, page }) => {
    const Home = new P_HomePage(page);
    // Open a new tab in the same browser window
    const counselorPage = await context.newPage();
    const Login = new LoginPage(counselorPage);
    const C_Home = new C_HomePage(counselorPage);

    // Navigate to the counselor login page and log in
    await Login.gotoLoginPage('counsellor');
    await page.waitForTimeout(1000);
    await Login.login('test@mailinator.com', '123456');
    const { only_date, f_Time, fullDate } = await C_Home.patient_reg_slot();

    // Switch back to the Patient page
    await page.bringToFront();

    // Create, Check Details, Delete Appointment
    await Home.create_apt(only_date, f_Time, fullDate);
    await Home.apt_detail();
    await Home.apt_cancel();

    // Switch to Counsellor
    await counselorPage.bringToFront();
    // Delete the registered slots
    await C_Home.patient_delete_slot();
});

test('notes', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.your_notes();
});

test('faq', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.faq();
});

test('feedback', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.feedback();
});

test('wellbeing', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.learn_about_wellbeing();
});

test('view_blogs', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.view_blogs();
});

test('my_counsellors', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.my_counsellors();
})

test('family_member', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.family_member();
})

test('change_pwd', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.change_pwd();
})

test('logout', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.logout();
})

test('no_relation', async ({ context, page }) => {
    const Home = new P_HomePage(page);

    // Open a new tab in the same browser window
    const counselorPage = await context.newPage();
    const Login = new LoginPage(counselorPage);
    const C_Home = new C_HomePage(counselorPage);

    // Navigate to the counselor login page and log in
    await Login.gotoLoginPage('counsellor');
    await page.waitForTimeout(1000);
    await Login.login('test@mailinator.com', '123456');
    // Register Slot for appointments creation
    const { only_date, f_Time } = await C_Home.patient_reg_slot();

    // Switch back to the Patient page
    await page.bringToFront();

    // Create & Delete relation with counsellor using appointment - Checking if counsellor list updates
    await Home.no_relation(only_date, f_Time);
    
    // Switch to Counsellor
    await counselorPage.bringToFront();
    // Delete the registered slots
    await C_Home.patient_delete_slot();
})

test('subscription', async ({ page }) => {
    const Home = new P_HomePage(page);
    await Home.subscription();
})
