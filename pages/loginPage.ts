import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";
export class LoginPage extends BasePage {

    readonly page: Page
    private loginButton: Locator
    private playFreeButton: Locator
    private signInButton: Locator
    private emailInput: Locator
    private passwordInput: Locator
    private invalidUserNameOrPasswordAlert: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true })
        this.emailInput = page.getByPlaceholder('Email')
        this.passwordInput = page.getByPlaceholder('Password')
        this.invalidUserNameOrPasswordAlert = page.locator("//*[@role='alert']//span")
        this.playFreeButton = page.getByRole('link', { name: 'PLAY FREE' })
        this.signInButton = page.getByRole('link', { name: 'Already have an account? Sign in' })
    }

    //Fill the input fields
    async loginWithCredentials(username: string, password: string) {
        await this.emailInput.fill(username)
        await this.passwordInput.fill(password)
    }

    //Click on Login Button
    async clickLoginButton() {
        await this.loginButton.click()
    }

    //Click PlayFree Button
    async clickPlayFreeButton() {
        await this.playFreeButton.click()
    }

    //Click SignInButton
    async clickSignInButton() {
        await this.signInButton.click()
    }
    //Assert invalid message
    async getInvalidEmailOrPasswordAlertText() {
        return await this.invalidUserNameOrPasswordAlert.textContent()
    }

}