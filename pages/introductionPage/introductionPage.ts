import { Page, Locator, expect } from "@playwright/test"
import BasePage from "../basePage/basePage"
import { th } from "@faker-js/faker"


export class IntroductionPage extends BasePage {

    readonly page: Page
    private textHeader: Locator
    private nextButton: Locator
    private homeButton: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.textHeader = page.getByText('Face Julius In Your Tutorial!')
        this.nextButton = page.locator('a[href="/game/introduction"]')
        this.homeButton = page.getByRole('link', { name: 'BACK TO HOME' })

    }

    async isIntroductionPageOpened() {
        await this.nextButton.waitFor()
        return await this.nextButton.isVisible()
    }

    async clickNextButton() {
        await this.nextButton.click()
    }

    async clickHomeButton(){
        await this.homeButton.click()
    }
    async getHeaderText() {
        return await this.textHeader.textContent()
    }

}
