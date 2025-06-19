import { expect } from '@playwright/test'

exports.C_HomePage = class C_HomePage {
    constructor(page) {
        this.page = page;
        //SCHEDULE A SESSION
        this.sch_btn = page.getByRole('img', { name: 'scheduling icon' });
        //REGISTER SLOT
        this.register_btn = page.locator('#btnRegisterSlots');
        this.slot_btn = page.locator('#sh_lg_registerslot_time02');
        this.slot_btn1 = page.locator('#sh_lg_registerslot_time03');
        this.back_btn = page.locator('#btnGoBackSlots');
        this.ok_btn = page.getByRole('button', { name: 'Ok' || 'OK' });
        this.create_btn = page.getByRole('button', { name: 'Create' });
        this.yes_btn = page.getByRole('button', { name: 'Yes' });
        this.msg = page.locator('#swal2-content');
        this.project_selector = page.locator("label[for='Counsellor']");
        //CREATE APPOINTMENT
        this.create_apt_btn = page.getByRole('button', { name: 'Create Appointment' });
        this.year_dropdown = page.locator('#sh_cl_app_year svg');
        this.month_dropdown = page.locator('#sh_cl_app_month svg');
        this.day_dropdown = page.locator('#sh_cl_app_day svg');
        this.time_dropdown = page.locator('#sh_time_selector svg');
        this.user_dropdown = page.locator('#sh_user_selector svg');
        this.submit_btn = page.getByRole('button', { name: 'Submit' });
        //VIEW AND DELETE SLOT
        this.viewslot_btn = page.locator('#btnViewSlots');
        this.cancel_slot_btn = page.locator("(//button[@id='cancelBtn'])[1]");
        this.timeslot = page.locator('#sh_cl_viewslot_timevu1');
        //MANAGE PROJECT STATUS AVAILABILITY
        this.status_btn = page.getByRole('img', { name: 'faq icon' });
        this.checkbox = page.locator('#selectAllCheckbox');
        this.project_btn = page.locator('#projectCounsellor');
        //Appointment Detail/Edit
        this.apt_detail_btn = page.locator("(//button[@id='sh_cd_detail_btn'])[1]");
        this.logo = page.locator('#sh_cl_pt_logo');
        this.apt_edit_btn = page.locator("(//button[@id='sh_cd_edit_btn'])[1]");
        this.date_selector = page.locator("input[placeholder='Start date']");
        this.time_selector = page.locator('#select-time');
        this.apt_cancel_btn = page.locator("(//button[@id='sh_cd_cancel_btn'])[1]");
        //FAQ
        this.faq_btn = page.getByText('Frequently Asked Questions');
        this.subject_field = page.getByPlaceholder('Subject');
        this.desc_field = page.getByPlaceholder('Description');
        this.error = page.locator('#errorMessage');
        //BLOG
        this.blogs_btn = page.getByRole('img', { name: 'blog_icons' });
        //FEEDBACK
        this.feedback_btn = page.getByRole('img', { name: 'feedback icon' });
        this.start_fb_btn = page.getByRole('button', { name: 'Start Feedback' });
        this.close_fb_btn = page.locator('i');
        //YOUR NOTES
        this.notes_btn = page.locator('#imgNotes');
        this.view_note_btn = page.locator("(//button[@id='sh_nv_view_btn'])[1]");
        this.edit_note_btn = page.locator('#sh_nv_edit_btn');
        this.back_note_btn = page.locator('#sh_nv_back_btn');
        this.note_field = page.locator('#sh_nv_note_text');
        this.save_note_btn = page.locator('#sh_nv_save_btn');
        this.delete_note_btn = page.locator("(//button[@id='sh_nv_cancel_btn'])[1]");
        this.empty_note = page.locator('.sh-gnrl-empty-note');
        //HAMBURGER MENU --->
        this.profile_menu = page.locator('#sh_cl_profile');
        //MY CLIENTS
        this.my_clients_btn = page.locator('#sh_cl_mypatient');
        this.clt_detail_btn = page.locator("(//span[@class='icon'])[1]");
        this.session_reset_btn = page.locator('.session-reset-btn');
        //PAST SESSIONS
        this.past_session_btn = page.locator('#sh_pt_mycounsellor');
        this.next_btn = page.getByLabel('Next page');
        this.page_btn = page.getByLabel('Page 3');
        this.previous_btn = page.getByLabel('Previous page');
        this.start_date = page.locator("input[placeholder='Start date']");
        this.sdate = page.getByRole('button', { name: '1', exact: true });
        this.edate = page.getByRole('button', { name: '20' });
        this.search_btn = page.getByRole('button', { name: 'Search' });
        this.clear_btn = page.getByRole('button', { name: 'Clear' });
        this.export_btn = page.getByRole('button', { name: 'Export Excel' });
        this.apt_status_btn = page.locator('div:nth-child(2) > div:nth-child(5)').first();
        this.apt_status_opt = page.locator('#react-select-2-option-1');
        this.select_issue = page.locator("(//button[@class='sh-gnrl-btn sh-add-nature-btn p-3'])[8]");
        this.issue_selector = page.locator('#modal svg');
        // this.issue_btn = page.getByText('Other', { exact: true });
        this.issue_btn = page.getByText('Anxiety', { exact: true });
        this.remove_issue = page.locator('#modal path').first();
        this.issue_field = page.locator('input[name="natureOfIssues"]').nth(1);
        this.close_issue = page.locator('#modal i');
        //CHANGE PASSWORD
        this.change_pwd_btn = page.locator('#sh_cl_chng_password');
        this.cancel_pwd_btn = page.getByRole('button', { name: 'Cancel' });
        this.confirm_pwd_btn = page.getByRole('button', { name: 'Change Password' });
        this.old_pwd_field = page.getByPlaceholder('Old Password');
        this.new_pwd_field = page.getByPlaceholder('New Password');
        this.cfm_pwd_field = page.getByPlaceholder('Confirm Password');
        //LOGOUT
        this.logout_btn = page.locator('#sh_cl_logout');
    }

    async project_select_all() {
        await this.status_btn.click();
        await this.checkbox.click();
        await this.ok_btn.click();
        await this.ok_btn.click();
    }
    async project_select_single() {
        await this.status_btn.click();
        await this.project_btn.click();
        await this.ok_btn.click();
        await this.ok_btn.click();
    }

    async register_slot() {
        await this.sch_btn.click();
        await this.register_btn.click();
        //Create without selecting any slot
        await this.create_btn.click();
        await expect(this.msg).toHaveText('Please select any slot timing!');
        await this.ok_btn.click();
        await this.page.waitForTimeout(1000);
        //Create slot under 24 hrs
        await this.page.locator('#sh_lg_registerslot_time00').click({ force: true });
        await this.checkbox.click();
        await this.ok_btn.click();
        await this.create_btn.click();
        await expect(this.msg).toHaveText('Please create a slot that is at least 24 hours ahead.');
        await this.ok_btn.click();
        await this.back_btn.click();
        await this.yes_btn.click();
        //Creating a slot after 24 hrs
        await this.sch_btn.click();
        await this.register_btn.click();
        await this.slot_btn.click({ force: true }); // Availabie Slot is hidden hence using force: true
        await this.checkbox.click();
        await this.ok_btn.click();
        await this.create_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
        //Selecting a slot that is already created
        await this.sch_btn.click();
        await this.register_btn.click();
        await expect(this.slot_btn).toBeVisible(); // Already Created Slot is visible
        //Creating a slot with a single project
        await this.slot_btn1.click({ force: true });
        await this.project_selector.click();
        await this.checkbox.click();
        await this.project_selector.click();
        await this.ok_btn.click();
        await this.create_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
    }

    async patient_reg_slot() {
        // Register Slot - Used for Appointment Creation on Patient Portal
        await this.sch_btn.click();
        await this.register_btn.click();
        await this.slot_btn.click({ force: true });
        await this.checkbox.click();
        await this.ok_btn.click();
        await this.create_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
        await this.sch_btn.click();
        await this.register_btn.click();
        await this.slot_btn1.click({ force: true });
        await this.checkbox.click();
        await this.ok_btn.click();
        await this.create_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
        await this.sch_btn.click();
        await this.viewslot_btn.click();
        const [date, time] = (await this.timeslot.textContent()).trim().split(' '); //Gets date as "2025-02-14" and time as 00:00:00 
        const only_date = new Date(date).getDate().toString(); // Extracts only the day (e.g., "14")
        const fullDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date)); // Formats as February 20, 2025
        const [h, m] = time.split(':');
        const f_Time = `${(h % 12) || 12}:${m} ${h >= 12 ? 'PM' : 'AM'}`; // Converts 24-hour to 12-hour format
        return { only_date, f_Time, fullDate };
    }

    async patient_delete_slot() {
        // View and Delete a registered slot
        await this.cancel_slot_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
        await this.cancel_slot_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
    }

    async create_apt(year, month, day, time, user) {
        await this.sch_btn.click();
        await this.create_apt_btn.click();

        await this.year_dropdown.click();
        await this.page.getByText(year, { exact: true }).click();

        await this.month_dropdown.click();
        await this.page.getByText(month, { exact: true }).click();

        await this.day_dropdown.click();
        await this.page.getByText(day, { exact: true }).click();

        await this.time_dropdown.click();
        await this.page.getByText(time, { exact: true }).click();

        await this.user_dropdown.click();
        await this.page.getByText(user, { exact: true }).click();

        await this.submit_btn.click();
        await this.ok_btn.click();
    }

    async view_slot() {
        // View and Delete a registered slot
        await this.sch_btn.click();
        await this.viewslot_btn.click();
        await this.cancel_slot_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
        await expect.soft(this.cancel_slot_btn.click());
        await expect.soft(this.yes_btn.click());
        await expect.soft(this.ok_btn.click());
    }

    async apt_detail() {
        await this.apt_detail_btn.click();
        await this.logo.click();
    }

    async apt_edit(date, time) {
        await this.apt_edit_btn.click();
        await this.date_selector.click();
        await this.date_selector.fill(date);
        await this.time_selector.click();
        await this.time_selector.selectOption(time);
        await this.submit_btn.click();
        await this.ok_btn.click();
    }

    async apt_cancel() {
        await this.apt_cancel_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
    }
    async your_notes() {
        await this.notes_btn.click();
        await this.page.waitForTimeout(1500);
        // if No Notes Available
        if (await this.empty_note.isVisible()) {
            await expect(this.empty_note).toHaveText('You do not have any notes.');
        }
        else {
            // If Notes Are Available - VIEW, EDIT, DELETE
            await this.view_note_btn.click();
            await this.edit_note_btn.click();
            await this.back_note_btn.click();
            await this.edit_note_btn.click();
            await this.note_field.fill('Check this new note');
            await this.save_note_btn.click();
            await this.back_note_btn.click();
            await this.delete_note_btn.click();
            await this.yes_btn.click();
            await this.ok_btn.click();
        }
    }

    async faq() {
        await this.faq_btn.click();
        //Both fields empty
        await this.subject_field.click();
        await this.subject_field.fill('');
        await this.desc_field.click();
        await this.desc_field.fill('');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Please fill all the fields');
        //Subject empty
        await this.desc_field.fill('test description');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Please fill all the fields');
        //Desc empty
        await this.subject_field.fill('test subject');
        await this.desc_field.fill('');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Please fill all the fields');
        //Minimum Char in Description validation
        await this.desc_field.fill('abcd');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Description should contain atleast 10 characters');
        //Valid Submission
        await this.desc_field.fill('test description');
        await this.submit_btn.click();
        await this.ok_btn.click();
    }

    async feedback() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            await this.feedback_btn.click(),
            await this.close_fb_btn.click(),
            await this.feedback_btn.click(),
            await this.start_fb_btn.click(),
        ]);
        await expect(newPage).toHaveURL('https://docs.google.com/forms');
    }

    async view_blogs() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.blogs_btn.click(),
        ]);
        await expect(newPage).toHaveURL('https://www.---.com/blog');
    }

    async my_clients() {
        await this.profile_menu.click();
        await this.my_clients_btn.click();
        await this.clt_detail_btn.click();
    }

    // async session_cap(){
    //     await this.profile_menu.click();
    //     await this.my_clients_btn.click();
    //     await this.clt_detail_btn.click();
    //     await this.page.pause();
    //     await this.session_reset_btn.click();
    //     await this.yes_btn.click();
    //     await this.ok_btn.click();
    // }

    async past_session() {
        await this.profile_menu.click();
        await this.past_session_btn.click();
        //Status Change
        await this.apt_status_btn.click();
        await this.apt_status_opt.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
        //Pagination
        await this.next_btn.click();
        await this.page_btn.click();
        await this.previous_btn.click();
        await this.previous_btn.click();
        //Nature of Issue
        await this.select_issue.click();
        await this.issue_selector.click();
        await this.issue_btn.click();
        await this.remove_issue.click();
        await this.issue_selector.click();
        await this.issue_btn.click();
        await this.submit_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
        await this.select_issue.click();
        await this.close_issue.click();
        await this.select_issue.click();
        await this.cancel_pwd_btn.click();
        // await this.select_issue.click();
        // await this.issue_selector.click();
        // await this.issue_btn.click();
        // await this.remove_issue.click();
        // await this.issue_selector.click();
        // await this.issue_btn.click();
        // await this.issue_field.fill('BPD')
        // await this.submit_btn.click();
        // await this.yes_btn.click();
        // await this.ok_btn.click();
        // await this.select_issue.click();
        // await this.close_issue.click();
        // await this.select_issue.click();
        // await this.cancel_pwd_btn.click();
        //Date Filter
        await this.start_date.click();
        await this.sdate.first().click();
        await this.edate.click();
        await this.search_btn.click();
        //Export
        await this.export_btn.click();
        //Clear
        await this.clear_btn.click();
    }

    async change_pwd() {
        //Cancel button
        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.cancel_pwd_btn.click();
        //Empty Fields
        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('Please fill all the fields!');
        await this.ok_btn.click();

        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.old_pwd_field.fill('123456');
        await this.new_pwd_field.fill('1234567');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('Please fill all the fields!');
        await this.ok_btn.click();

        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.new_pwd_field.fill('1234567');
        await this.cfm_pwd_field.fill('1234567');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('Please fill all the fields!');
        await this.ok_btn.click();

        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.old_pwd_field.fill('123456');
        await this.cfm_pwd_field.fill('1234567');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('Please fill all the fields!');
        await this.ok_btn.click();
        //Incorrect Old Password
        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.old_pwd_field.fill('12345');
        await this.new_pwd_field.fill('1234567');
        await this.cfm_pwd_field.fill('1234567');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('You have entered wrong old password');
        await this.ok_btn.click();

        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.old_pwd_field.fill('1234567');
        await this.new_pwd_field.fill('1234567');
        await this.cfm_pwd_field.fill('1234567');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('You have entered wrong old password');
        await this.ok_btn.click();
        //New & Confirm Password doesn't match
        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.old_pwd_field.fill('123456');
        await this.new_pwd_field.fill('1234567');
        await this.cfm_pwd_field.fill('12345678');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('Please enter same password in both fields!');
        await this.ok_btn.click();
        //Using old password as new & confirm password
        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.old_pwd_field.fill('123456');
        await this.new_pwd_field.fill('123456');
        await this.cfm_pwd_field.fill('123456');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('You entered your old password. Please enter a new one');
        await this.ok_btn.click();
        //Valid Case
        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.old_pwd_field.fill('123456');
        await this.new_pwd_field.fill('1234567');
        await this.cfm_pwd_field.fill('1234567');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('Your password has succesfully been changed!');
        await this.ok_btn.click();
        await this.profile_menu.click();
        await this.change_pwd_btn.click();
        await this.old_pwd_field.fill('1234567');
        await this.new_pwd_field.fill('123456');
        await this.cfm_pwd_field.fill('123456');
        await this.confirm_pwd_btn.click();
        await expect(this.msg).toHaveText('Your password has succesfully been changed!');
        await this.ok_btn.click();
    }

    async logout() {
        await this.profile_menu.click();
        await this.logout_btn.click();
    }
}
