import { expect } from '@playwright/test'

exports.P_HomePage = class P_HomePage {
    constructor(page) {
        this.page = page;
        //SCHEDULE A SESSION
        this.sch_btn = page.getByRole('img', { name: 'scheduling icon' });
        //REGISTER SLOT
        this.ok_btn = page.getByRole('button', { name: 'Ok' || 'OK' });
        this.create_btn = page.getByRole('button', { name: 'Create' });
        this.yes_btn = page.getByRole('button', { name: 'Yes' });
        this.msg = page.locator('#swal2-content');
        //CREATE APPOINTMENT
        this.service_type_wb = page.getByText('Wellbeing', { exact: true });
        this.service_type_nt = page.getByText('Nutritionist', { exact: true });
        this.submit_btn = page.getByRole('button', { name: 'Submit' });
        this.find_time_btn = page.getByRole('button', { name: 'Find Another Time' });
        this.chosen_time = page.locator('.text-center.mt-3');
        //Appointment Detail/Edit
        this.no_apt_msg = page.getByText('No appointments to show', { exact: true });
        this.apt_detail_btn = page.locator("(//button[@id='sh_pd_detail_btn'])[1]");
        this.logo = page.locator('#sh_cl_pt_logo');
        this.date_selector = page.locator("input[placeholder='Start date']");
        this.time_selector = page.locator('#select-time');
        this.apt_cancel_btn = page.locator("(//button[@id='sh_pd_cancel_btn'])[1]");
        //LEARN ABOUT WELLBEING
        this.wellbeing_btn = page.getByRole('img', { name: 'faq icon' });
        this.no_btn = page.getByRole('button', { name: 'No' });
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
        this.profile_menu = page.locator('#sh_pt_profile');
        //MY COUNSELLORS
        this.my_counsellors_btn = page.locator('#sh_pt_mycounsellor');
        this.session_history_btn = page.locator("(//div[@id='sh_pt_session_histroy'])[1]");
        this.close_history_btn = page.locator('#sh_pt_histroy_close');
        //ADD FAMILY MEMBER
        this.view_family_btn = page.locator('#sh_pt_addFamilyMember');
        this.add_member_btn = page.locator('#add-family-member-btn');
        this.name_field = page.locator("input[placeholder='Enter name']");
        this.email_field = page.locator('#emailAddress');
        this.relation_dpd = page.getByText('Select relation');
        this.relation = page.getByText('Others', { exact: true });
        this.delete_member = page.locator("(//span[@class='icon'])[1]");
        //CHANGE PASSWORD
        this.change_pwd_btn = page.locator('#sh_pt_chng_password');
        this.cancel_pwd_btn = page.getByRole('button', { name: 'Cancel' });
        this.confirm_pwd_btn = page.getByRole('button', { name: 'Change Password' });
        this.old_pwd_field = page.getByPlaceholder('Old Password');
        this.new_pwd_field = page.getByPlaceholder('New Password');
        this.cfm_pwd_field = page.getByPlaceholder('Confirm Password');
        //LOGOUT
        this.logout_btn = page.locator('#sh_pt_logout');
        //NO RELATION
        this.view_profile = page.locator('#btnCreateAppointment_0');
        this.book_now_btn = page.locator('#btnCancelCreateAppointment_0').or(page.locator("(//button[@id='btnCancelCreateAppointment'])[1]"));
        this.service_type_dpd = page.locator('.dropbtn');
        this.cancel_relation = page.locator("(//div[@id='sh_pt_cancel_relation'])[1]");
        this.confirm_btn = page.getByRole('button', { name: 'Confirm' });
        //SUBSCRIPTION
        this.s_msg = page.locator("div[class='grid-col'] div");
    }

    async create_apt(only_date, f_Time, fullDate){
        // Find Another Time
        await this.sch_btn.click();
        await this.service_type_wb.click();
        await this.find_time_btn.click();
        await expect(this.msg).toHaveText('Thank you! The Counsellor has been alerted and will be contacting you within 48 hours. Email contact@---.com for more info if needed.');
        await this.ok_btn.click();
        // Select a registered slot at other date for appointment
        await this.sch_btn.click();
        await this.service_type_wb.click();
        await this.page.getByText(only_date).first().click();
        await this.page.getByText(f_Time).click();
        // Checks whether it updates the date & time
        await expect(this.chosen_time).toContainText(fullDate+' '+f_Time);
        await this.submit_btn.click();
        await this.no_btn.click();
        // Books appointment
        await this.submit_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
    }

    // async no_apt(){
    //     return await this.no_apt_msg.isVisible();
    // }

    async apt_detail() {
        await this.apt_detail_btn.click();
        await this.logo.click();
    }

    async apt_cancel() {
        await this.apt_cancel_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
    }

    async your_notes() {
        await this.page.pause();
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
            this.feedback_btn.click(),
            this.start_fb_btn.click(),
        ]);
        await expect(newPage).toHaveURL('https://docs.google.com/forms');
    }

    async learn_about_wellbeing() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            await this.page.pause(),
            await this.wellbeing_btn.click(),
            await this.no_btn.click(),
            await this.wellbeing_btn.click(),
            await this.yes_btn.click(),
        ]);
        await expect(newPage).toHaveURL('https://www.---.com/blog');
    }

    async view_blogs() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.blogs_btn.click(),
        ]);
        await expect(newPage).toHaveURL('https://www.---.com/blog');
    }

    async my_counsellors() {
        // Open related counsellor list
        await this.profile_menu.click();
        await this.my_counsellors_btn.click();
        // Checking session history with related counsellor
        await this.session_history_btn.click();
        await this.close_history_btn.click();
    }

    async family_member() {
        await this.profile_menu.click();
        await this.view_family_btn.click();
        await this.page.waitForTimeout(1500);
        // If No Family Members Added
        if (await this.empty_note.isVisible()) {
            await expect(this.empty_note).toHaveText('No family members added, please click button to add.');
        }
        // Family Members Are Added - VIEW, ADD, DELETE
        await this.add_member_btn.click();

        const random = `patient${Date.now()}`;

        await this.name_field.fill(random);
        await this.email_field.fill(random + '@mailinator.com');
        await this.relation_dpd.click();
        await this.relation.click();
        await this.submit_btn.click();
        await expect(this.msg).toHaveText('Family member added successfully. Invitation sent to the family member with login details.');
        await this.ok_btn.click();
        await this.page.getByRole('cell', { name: random, exact: true }).isVisible();
        await this.delete_member.click();
        await this.no_btn.click();
        await this.delete_member.click();
        await this.yes_btn.click();
        await expect(this.msg).toHaveText('Your family member has been removed.');
        await this.ok_btn.click();
        await this.add_member_btn.click();
        await this.cancel_pwd_btn.click();
        await this.no_btn.click();
        await this.cancel_pwd_btn.click();
        await this.yes_btn.click();
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

    async no_relation(only_date, f_Time){
        // Checking if the list updates when you change service type
        await this.service_type_dpd.click();
        await this.page.waitForTimeout(500);
        await this.service_type_nt.click();
        await this.service_type_dpd.click();
        await this.page.waitForTimeout(500);
        await this.service_type_wb.click();
        // Checking View Profile & Book Now Redirection if Patient has no relation
        await this.view_profile.click();
        await this.book_now_btn.click();
        await this.page.goBack();
        await this.page.goBack();
        await this.book_now_btn.click();
        // Booking Appointment to Create Relation
        await this.page.getByText(only_date).first().click();
        await this.page.getByText(f_Time).click();
        await this.submit_btn.click();
        await this.yes_btn.click();
        await this.ok_btn.click();
        // Checking schedule session with a service type patient isn't related to
        await this.sch_btn.click();
        await this.service_type_nt.click();
        await this.service_type_dpd.click();
        await this.page.waitForTimeout(500);
        await this.service_type_wb.click();
        // Checking Msg if you already have a relation with counsellor of a service type
        await this.page.getByText('You already have an active relationship with a counsellor for this service type. To switch counsellors, please delete your current relationship.').isVisible();
        await this.page.goBack();
        // Cancelling the appointment
        await this.apt_cancel();
        // Deleting Relation
        await this.profile_menu.click();
        await this.my_counsellors_btn.click();
        await this.cancel_relation.click();
        await this.confirm_btn.click();
        await this.ok_btn.click();
    }

    async subscription(){
        await this.service_type_dpd.click();
        await this.service_type_nt.click();
        await expect(this.msg).toHaveText('Dear Client, Nutritionist services are not subscribed by your company. Email contact@---.com if you would like them activated.');
        await this.ok_btn.click();
        await expect(this.s_msg).toHaveText('Dear Client, Nutritionist services are not subscribed by your company. Email contact@---.com if you would like them activated.');
    }
}
