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
    this.playButton = page.getByRole("button", { name: "PLAY" });
    this.randomNameButton = page.getByRole("button", { name: "RANDOM" });
    this.confirmButton = page.getByPlaceholder("...");
    this.nameInputField = page.getByRole("button", { name: "CONFIRM" });
    this.enterNameText = page.getByText("ENTER A NAME");
  }

  async openNamePopup() {
    await this.playButton.waitFor(); //wait for play button to appear

    const box = await this.playButton.boundingBox();
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
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

  async startTheGame() {
    await this.playButton.waitFor();
    await this.playButton.click();
  }
}
