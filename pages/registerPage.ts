import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";



export class RegisterPage extends BasePage{

    readonly page: Page
    private signInButton: Locator
    private nameInput: Locator
    private emailInput: Locator
    private passwordInput: Locator
    private registerButton: Locator
    private cookieModal: Locator
    private acceptAllCookiesButton: Locator
    private errorMessage: Locator
    private termsAndPrivacyCheckbox: Locator



    constructor(page: Page) {
        super(page)
        this.page = page
        this.signInButton = page.getByRole('link', { name: 'Already have an account? Sign in' })
        this.nameInput = page.getByRole('textbox', {name:'Name'})
        this.emailInput = page.getByRole('textbox', {name:'email'})
        this.passwordInput = page.getByRole('textbox', {name:'password'})
        this.registerButton = page.getByRole('button', {name:'Register'})
        this.cookieModal = page.locator('.cf_consent-buttons')
        this.acceptAllCookiesButton = page.locator('.cf_button cf_button--accept')
        this.errorMessage = page.locator('span.input-label')
        this.termsAndPrivacyCheckbox = page.locator('#terms_and_privacy')

    }

    async openLoginPage() {
        await this.signInButton.click()
    }

    async fillNameField(name:string){
        await this.nameInput.fill(name)
    }

    async fillEmailField(email:string){
        await this.emailInput.fill(email)
    }

    async fillPasswordField(password:string){
        await this.passwordInput.fill(password)
    }

    async clickRegisterButton(){
        await this.registerButton.click()
    }
    
    async acceptAllCookies() {
        await this.cookieModal.waitFor()
        await this.cookieModal.click()
        await this.page.keyboard.press('Escape');

        //await this.acceptAllCookiesButton.click()
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent()
    }

    async checkTermsAndPrivacy() {
        await this.termsAndPrivacyCheckbox.check()
    }
}