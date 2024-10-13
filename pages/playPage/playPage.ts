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
    var box = (await this.playButton.boundingBox())!;
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
    await this.page.waitForSelector('#playButton', { state: 'visible' });

    await this.page.evaluate(() => {
      const element = document.querySelector('.relative.flex.justify-center.items-center.p-0');
      if (element) {
        element.classList.remove('consistently-get-big-and-small');
      } else {
        console.error('Element not found!');
      }
    });

    await this.page.getByText('9Play0ArenaBURN&').press('Tab');
    await this.playButton.press('Enter');
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
