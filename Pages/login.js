import { expect } from '@playwright/test'

exports.LoginPage = class LoginPage {
    constructor(page) {
      this.page = page;
      this.email_field = page.getByLabel('Email Address');
      this.pwd_field = page.getByLabel('Enter Password');
      this.signin_btn = page.getByRole('button', { name: 'Sign In' });
      this.errorMessage = page.locator('.sh-gnrl-error-msg');
      this.view_blogs = page.getByRole('link', { name: 'View Blogs' });
      this.forgot_pwd = page.getByRole('button', { name: 'Forgot password?' });
      this.reset_pwd_btn = page.locator('#sh_fp_btn');
      this.msg = page.locator('#swal2-content');
      this.customer_support = page.locator('.mobile-contact-help');
      this.contact = page.getByRole('link', { name: 'contact@---.com' });
      this.signin_register = page.locator('#sh_pl_reg_btn');
      this.couns_signin = page.locator('#sh_cl_cnslr_sign_in');
      this.name_field = page.getByLabel('Name');
      this.subsidiary_selector = page.locator('#sh_pr_age');
      this.confirm_pwd_field = page.getByLabel('Confirm Password');
      this.checkbox = page.locator('#sh_pr_term_cond');
      this.register_btn = page.getByRole('button', { name: 'Register' });
      this.tandc = page.getByRole('link', { name: 'Terms & Condition' });
      this.Signin_here = page.getByText('Sign In here');
      //FAQ
      this.faq = page.getByRole('link', { name: 'FAQ' });
      this.faq_btn = page.getByText('Frequently Asked Questions');
      this.name_field = page.getByPlaceholder('Full Name');
      this.faq_email_field = page.getByPlaceholder('Email Address');
      this.subject_field = page.getByPlaceholder('Subject');
      this.desc_field = page.getByPlaceholder('Description');
      this.error = page.locator('#errorMessage');
      this.submit_btn = page.getByRole('button', { name: 'Submit' });
      this.ok_btn = page.getByRole('button', { name: 'Ok' || 'OK' });
    }
    
    async gotoLoginPage(user){
        if(user == 'counsellor'){
          await this.page.goto('https://counsellor.staging.---er.com/login/counsellor');
        }
        else if(user == 'patient'){
          await this.page.goto('https://procare.staging.---er.com');
        }
        else if(user == 's_patient'){
          await this.page.goto('https://psychcare.staging.---er.com');
        }
        else{
          return;
        }
    }

    async expectErrorMessage(expectedText) {
        await expect(this.errorMessage).toHaveText(expectedText);
    }
    
    async login(email, password) {
      await this.email_field.fill(email);
      await this.pwd_field.fill(password);
      await this.signin_btn.click();
    }

    async clickRedirect(user) {
      const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.view_blogs.click(),
      ]);
      await newPage.waitForLoadState(); 
      await expect(newPage).toHaveURL('https://www.---.com/blog');
      await newPage.close();

      if(user == 'counsellor'){
        await this.page.pause();
        await this.faq.click();
        await expect(this.page).toHaveURL('https://counsellor.staging.---er.com/faq');
  
        await this.gotoLoginPage('counsellor');
  
        await this.forgot_pwd.click();
        await expect(this.page).toHaveURL('https://counsellor.staging.---er.com/emailverification');

        const customer_supportHref = await this.customer_support.getAttribute('href');
        expect(customer_supportHref).toBe('mailto:undefined');
  
        await this.gotoLoginPage('counsellor');
      }
      else if(user == 'patient'){
        await this.faq.click();
        await expect(this.page).toHaveURL('https://procare.staging.---er.com/faq');
  
        await this.gotoLoginPage('patient');
        
        await this.signin_register.click();
        await expect(this.page).toHaveURL('https://procare.staging.---er.com/registration');

        await this.gotoLoginPage('patient');

        await this.couns_signin.click();
        await expect(this.page).toHaveURL('https://counsellor.staging.---er.com/login/counsellor');

        await this.gotoLoginPage('patient');
  
        await this.forgot_pwd.click();
        await expect(this.page).toHaveURL('https://procare.staging.---er.com/emailverification');

        const customer_supportHref = await this.customer_support.getAttribute('href');
        expect(customer_supportHref).toBe('mailto:undefined');

        await this.gotoLoginPage('patient');
      }
      else{
        return;
      }
    
      const contactHref = await this.contact.getAttribute('href');
      expect(contactHref).toBe('mailto:contact@---.com');
  }

  async gotoRegisterPage(){
    await this.page.goto('https://procare.staging.---er.com/registration');
  }

  async register(name,email,subsidiary,pwd,confirm_pwd, checkTerms = true){
    await this.name_field.fill(name);
    await this.email_field.fill(email);
    await this.page.pause();
    await this.subsidiary_selector.selectOption(subsidiary);
    await this.pwd_field.fill(pwd);
    await this.confirm_pwd_field.fill(confirm_pwd);
    if (checkTerms) {
      await this.checkbox.click();
    }
    await this.register_btn.click();
  }

  async reg_redirect(){
    const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.view_blogs.click(),
    ]);
    await newPage.waitForLoadState(); 
    await expect(newPage).toHaveURL('https://www.---.com/blog');
    await newPage.close();
  
      await this.faq.click();
      await expect(this.page).toHaveURL('https://procare.staging.---er.com/faq');
  
      await this.gotoRegisterPage();

      await this.tandc.click();
      await expect(this.page).toHaveURL('https://procare.staging.---er.com/tandc');
      
      await this.gotoRegisterPage();

      await this.Signin_here.click();
      await expect(this.page).toHaveURL('https://procare.staging.---er.com');
  
      await this.gotoRegisterPage();
  
    const contactHref = await this.contact.getAttribute('href');
    expect(contactHref).toBe('mailto:contact@---.com');
  }

  async faq_validations(){
    await this.faq.click();
        //All fields empty
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Please fill all the fields');
        //Name empty
        await this.faq_email_field.fill('john@email.com');
        await this.subject_field.fill('this is a subject');
        await this.desc_field.fill('this is a description');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Please fill all the fields');
        //Email empty
        await this.name_field.fill('John');
        await this.faq_email_field.fill('')
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Please fill all the fields');
        //Subject empty
        await this.faq_email_field.fill('john@email.com');
        await this.subject_field.fill('');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Please fill all the fields');
        //Desc empty
        await this.subject_field.fill('this is a subject');
        await this.desc_field.fill('');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Please fill all the fields');
        //Minimum Char in Description validation
        await this.desc_field.fill('abcd');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('Description should contain atleast 10 characters');
        //Email Validation
        await this.desc_field.fill('this is a description');
        await this.faq_email_field.fill('johnemail.com');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('You have entered an invalid email address!');
        await this.faq_email_field.fill('john@emailcom');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('You have entered an invalid email address!');
        await this.faq_email_field.fill('john@.com');
        await this.submit_btn.click();
        await expect(this.error).toHaveText('You have entered an invalid email address!');
        //Valid Submission
        await this.faq_email_field.fill('john@mail.com');
        await this.submit_btn.click();
        await this.ok_btn.click();
  }

  async forgot_password(){
    await this.forgot_pwd.click();
    //Empty field submitted
    await this.reset_pwd_btn.click();
    await expect(this.errorMessage).toHaveText('Please enter email address');
    //Invalid Email submitted
    await this.email_field.fill('john');
    await this.reset_pwd_btn.click();
    await expect(this.msg).toHaveText('You have entered an invalid email address!');
    await this.ok_btn.click();
    //Unregistered Email submitted
    await this.email_field.fill('john846@mailinator.com');
    await this.reset_pwd_btn.click();
    await expect(this.msg).toHaveText('Provided email is not registered.');
    await this.ok_btn.click();
    //Registered Email submitted
    await this.email_field.fill('---@mailinator.com');
    await this.reset_pwd_btn.click();
    await expect(this.msg).toHaveText('Please check your inbox, an email is on the way.');
    await this.ok_btn.click();
  }
}
