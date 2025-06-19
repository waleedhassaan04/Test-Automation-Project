import { test, expect } from '@playwright/test'
import { LoginPage } from '../Pages/login'
import { C_HomePage } from '../Pages/couns_home'

test.beforeEach('login_successfully', async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.gotoLoginPage('counsellor');
    await Login.login('---@mailinator.com', '123456');
});

test('project_status', async ({ page }) => {
    const Home = new C_HomePage(page);
    //unselect all
    await Home.project_select_all();
    //select all
    await Home.project_select_all();
    //unselect single project - counsellor
    await Home.project_select_single();
    //select single project - counsellor
    await Home.project_select_single();
});

test('register_slot', async ({ page }) => {
    const Home = new C_HomePage(page);
    // slot-Horizontal_Id-Vertical_Id-Year-Month-Date\\ Hour\\Minute\\Second
    // await Home.register_slot('[id="slot-6-0-2025-02-06\\ 00\\:00\\:00"] > div > div');
    await Home.register_slot();
});

test('view_slot', async ({ page }) => {
    const Home = new C_HomePage(page);
    // View and Delete the first slot in list
    await Home.view_slot();
});

test('session_options', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.create_apt('2025', 'December', '25', '12:00 AM', 'PATIENT WELLBEING');
    await Home.apt_detail();
    await Home.apt_edit('December 30, 2025', '01:00:00');
    await Home.apt_cancel();
});

test('notes', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.your_notes();
});

test('faq', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.faq();
});

test('feedback', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.feedback();
});

test('view_blogs', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.view_blogs();
});

test('my_clients', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.my_clients();
})

test('past_session', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.past_session();
})

test('change_pwd', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.change_pwd();
})

test('logout', async ({ page }) => {
    const Home = new C_HomePage(page);
    await Home.logout();
})
