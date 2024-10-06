import { Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class PlayPage extends BasePage {

    readonly page: Page
    private firstPlayForFreeButton: Locator
    private secondPlayForFreeButton: Locator
    private randomNameButton: Locator
    private confirmButton: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.firstPlayForFreeButton = page.getByRole('link', { name: 'PLAY FREE' })
        this.secondPlayForFreeButton = page.locator("//*[contains(@class, 'register' )]//a").nth(2)
        this.secondPlayForFreeButton = page.locator("//*[contains(@class, 'RANDOM' )]//a")
        this.confirmButton = page.locator("//*[contains(@class, 'Confirm' )]//a")
    }
    
}