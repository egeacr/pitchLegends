import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class LoginPage extends BasePage {

    readonly page: Page
    private loginButton: Locator
    private emailInput: Locator
    private passwordInput: Locator
    private invalidUserNameOrPasswordAlert: Locator
    private validationMessage

    constructor(page: Page) {
        super(page)
        this.page = page
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true })
        this.emailInput = page.getByPlaceholder('Email')
        this.passwordInput = page.getByPlaceholder('Password')
        this.invalidUserNameOrPasswordAlert = page.locator("//*[@role='alert']//span")
    }

    //Fill the input fields
    async loginWithCredentials(username: string, password: string) {
        await this.page.waitForTimeout(1000)
        await this.emailInput.fill(username)
        await this.passwordInput.fill(password)
    }

    //Click on Login Button
    async clickLoginButton() {
        await this.loginButton.click()
        await this.page.waitForTimeout(1500)
        //this timeout should be deleted 
    }

    //Assert invalid message
    async getInvalidEmailOrPasswordAlertText() {
        return await this.invalidUserNameOrPasswordAlert.textContent()
    }

    //Get all the input fields warning messages
    async getAllWarningMessages() {
        this.validationMessage = await this.page.evaluate(() => {
            const inputField = document.querySelector('form input:invalid') as HTMLInputElement;
            return inputField ? inputField.validationMessage : null;

        });
        console.log('Warning Message :' + this.validationMessage);
        return this.validationMessage
    }

    //Assert the warning messages
    async assertAllWarningMessages(warningMessageEN: string, warningMessageTR: string, emailWarning: string, emailWarning_: string) {
        try {
            const validationMessage = await this.getAllWarningMessages();
            const errorMessagePattern = new RegExp(warningMessageEN + '|' + warningMessageTR + '|' + emailWarning + '|' + emailWarning_);
            //expect(validationMessage).toMatch(errorMessagePattern);
            expect(validationMessage.includes(warningMessageEN) || validationMessage.includes(warningMessageTR)
                                                                || validationMessage.includes(emailWarning)
                                                                || validationMessage.includes(emailWarning_));

        } catch (error) {
            console.error("An error occurred while asserting warning messages:", error);
            throw error;
        }
    }

}