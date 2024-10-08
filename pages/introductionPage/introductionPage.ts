import { Page, Locator } from "@playwright/test"
import BasePage from "../basePage/basePage"


export class IntroductionPage extends BasePage {

    readonly page: Page
    private textHeader: Locator
    private nextButton: Locator
    

    constructor(page: Page) {
        super(page)
        this.page = page
        this.textHeader = page.getByText('Face Julius In Your Tutorial!')
        this.nextButton = page.locator('a[href="/game/introduction"]')

    
    }

    async isIntroductionPageOpened() {
        await this.nextButton.waitFor()
        return await this.nextButton.isVisible()
    }

    async getHeaderText() {
        return await this.textHeader.textContent()
    } 

}
