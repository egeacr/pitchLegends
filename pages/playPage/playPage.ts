import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class PlayPage extends BasePage {

    readonly page: Page
    private playButton: Locator
    private randomNameButton: Locator
    private confirmButton: Locator
    private nameInputField: Locator
    private enterNameText: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.playButton = page.locator("//p[normalize-space()='PLAY']//ancestor::button")
        this.randomNameButton = page.locator("//*[contains(@class, 'RANDOM' )]//a")
        this.confirmButton = page.getByPlaceholder('...');
        this.nameInputField = page.locator("//*[contains(@class, 'Confirm' )]//a")
        this.enterNameText = page.locator("//*[contains(@class, 'ENTER A NAME' )]//a")
    }

    async openNamePopup(){
        await this.playButton.waitFor(); //wait for play button to appear
        await this.playButton.click(); //click on the play button
        await this.nameInputField.waitFor() //wait for input field to appear
        await this.enterNameText.waitFor() //wait for enter name text to appear
        await this.randomNameButton.waitFor() //wait for random name generator button
    }

    async generateRandomName(){
        await this.openNamePopup();
        await this.randomNameButton.click();
        await expect(this.nameInputField).not.toBeEmpty();
    }

    async confirmRandomName(){
        await this.confirmButton.waitFor();
        await this.confirmButton.click();
    }
    
}