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

      //const element2 = document.querySelector('.box-shadow:0px 0px 1000px 1000px rgba(0, 0, 0, 0.7), inset 0px 20px 30px rgba(0, 0, 0, 0.7);filter:brightness(1.5);z-index:2');


      if (element) {
        element.classList.remove('consistently-get-big-and-small');
        // element2.classList.remove('consistently-get-big-and-small');

      } else {
        console.error('Element not found!');
      }
    });

    //await this.page.getByText('9Play0ArenaBURN&').press('Tab');
    //await this.playButton.press('Enter');

    // await this.playButton.dispatchEvent("click");

    await expect(async () => {
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
