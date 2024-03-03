import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";



export class RegisterPage extends BasePage{

    readonly page: Page
    private signInButton: Locator
    private nameInput: Locator
    private emailInput: Locator
    private passwordInput: Locator
    private registerButton: Locator



    constructor(page: Page) {
        super(page)
        this.page = page
        this.signInButton = page.locator("//a[@href='/auth/login']")
        this.nameInput = page.getByRole('textbox', {name:'name'})
        this.emailInput = page.getByRole('textbox', {name:'email'})
        this.passwordInput = page.getByRole('textbox', {name:'password'})
        this.passwordInput = page.getByRole('button', {name:'Register'})

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
    
    
}