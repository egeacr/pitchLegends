import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class PlayPage extends BasePage {
  readonly page: Page;
  private playButton: Locator;
  private randomNameButton: Locator;
  private confirmButton: Locator;
  private nameInputField: Locator;
  private enterNameText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.playButton = page.locator("#playButton");
    this.randomNameButton = page.getByRole("button", { name: "RANDOM" });
    this.nameInputField = page.getByPlaceholder("...");
    this.confirmButton = page.getByRole("button", { name: "CONFIRM" });
    this.enterNameText = page.getByText("ENTER A NAME");
  }

  async openNamePopup() {
    await this.page.waitForSelector('#playButton', { state: 'visible' });
    await this.playButton.waitFor({state:"attached"});
    await this.page.evaluate(() => {
      const playButton = document.getElementById('playButton');
      if (playButton) {
          playButton.click();
      } else {
          throw new Error("Play button not found");
      }
  });
    await this.nameInputField.waitFor(); //wait for input field to appear
    await this.enterNameText.waitFor(); //wait for enter name text to appear
    await this.randomNameButton.waitFor(); //wait for random name generator button
  }

  async generateRandomName() {
    await this.openNamePopup();
    await this.randomNameButton.click();
    await expect(this.nameInputField).not.toBeEmpty();
  }

  async confirmRandomName() {
    await this.confirmButton.waitFor();
    await this.confirmButton.click();
  }

  async fillName() {
    await this.nameInputField.fill("test");
  }

  async startTheGame() {
    await this.playButton.waitFor();
    await this.playButton.click();
  }
}
