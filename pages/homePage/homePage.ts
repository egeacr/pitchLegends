import { Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class HomePage extends BasePage {

    readonly page: Page
    private firstPlayForFreeButton: Locator
    private secondPlayForFreeButton: Locator
    private randomNameButton: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.firstPlayForFreeButton = page.getByRole('link', { name: 'PLAY FREE' })
        this.secondPlayForFreeButton = page.locator("//*[contains(@class, 'register' )]//a").nth(2)
        this.secondPlayForFreeButton = page.locator("//*[contains(@class, 'RANDOM' )]//a")
    }

    async openHomePage() {
        await this.page.goto('/')
    }

    async openRegisterPage() {
        await this.firstPlayForFreeButton.waitFor() //waitFor default parameter == 'visible'
        await this.firstPlayForFreeButton.click()
        await this.page.waitForURL('**/auth/register')
    }

    
}