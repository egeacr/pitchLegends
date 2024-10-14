import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class PlayPage extends BasePage {
  readonly page: Page;
  private playButton: Locator;
  private randomNameButton: Locator;
  private confirmButton: Locator;
  private nameInputField: Locator;
  private enterNameText: Locator;
  private playButton2: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.playButton = page.locator("#playButton");
    this.playButton2 = page.locator('xpath=//*[@id="playButton"]/img[2]');
    this.randomNameButton = page.getByRole("button", { name: "RANDOM" });
    this.nameInputField = page.getByPlaceholder("...");
    this.confirmButton = page.getByRole("button", { name: "CONFIRM" });
    this.enterNameText = page.getByText("ENTER A NAME");
  }

  async openNamePopup() {
    // var box = (await this.playButton.boundingBox())!;
    // await this.page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
    await this.waitPageLoad();


    await this.page.evaluate(() => {
      const element = document.querySelector('.relative.flex.justify-center.items-center.p-0.consistently-get-big-and-small') as HTMLElement;

      if (element) {
        console.error('Element found!');
        element.removeAttribute('style');
      } else {
        console.error('Element not found!');
      }
    });


    await expect(async () => {
      await this.waitPageLoad();
      await this.page.waitForSelector('#playButton', { state: 'visible' });
      // Click the button
      // await this.playButton2.click({ force: true });
      await this.playButton.dispatchEvent("click");
      await expect(this.page.getByText("RANDOM")).toBeVisible();
    }).toPass({
      intervals: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
    });

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
