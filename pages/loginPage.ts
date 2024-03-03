import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";



export class LoginPage extends BasePage{

    readonly page: Page
    private loginButton: Locator
    private emailInput: Locator
    private passwordInput: Locator
    private invalidUserNameOrPasswordAlert: Locator



    constructor(page: Page) {
        super(page)
        this.page = page
       
        this.loginButton = page.getByRole('button', {name:'Login', exact: true})
        this.emailInput = page.getByRole('textbox', {name:'email'})
        this.passwordInput = page.getByRole('textbox', {name:'password'})
        this.invalidUserNameOrPasswordAlert = page.locator("//*[@role='alert']//span")
    }
    

    async loginWithCredentials(username: string, password: string){
        await this.emailInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async getInvalidEmailOrPasswordAlertText(){
        return await this.invalidUserNameOrPasswordAlert.textContent()
    }
    
}