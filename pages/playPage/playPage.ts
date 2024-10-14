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
    // await this.waitPageLoad();


    //Delete shadow element
    await this.page.evaluate(() => {
      const element = document.querySelector('.relative.flex.justify-center.items-center.p-0.consistently-get-big-and-small') as HTMLElement;

      if (element) {
        console.error('Element found!');
        element.removeAttribute('style');
      } else {
        console.error('Element not found!');
      }
    });

    //Remove get big and small
    await this.page.evaluate(() => {
      const element = document.querySelector('.relative.flex.justify-center.items-center.p-0');
      if (element) {
        element.classList.remove('consistently-get-big-and-small');
      } else {
        console.error('Element not found!');
      }
    });


    // DElete  glow-effect-purple
    await this.page.evaluate(() => {
      const element = document.querySelector('.absolute.glow-effect-purple') as HTMLElement;

      if (element) {
        console.error('Element found! Classes before removal:', element.className);

        // Clear all classes
        while (element.classList.length > 0) {
          element.classList.remove(element.classList.item(0)!); // Remove the first class repeatedly
        }

        console.error('Classes after removal:', element.className);
      } else {
        console.error('Element not found!');
      }
    });

    // DElete  glow-effect-yellow
    await this.page.evaluate(() => {
      const element = document.querySelector('.absolute.glow-effect-yellow') as HTMLElement;

      if (element) {
        console.error('Element found! Classes before removal:', element.className);

        // Clear all classes
        while (element.classList.length > 0) {
          element.classList.remove(element.classList.item(0)!); // Remove the first class repeatedly
        }

        console.error('Classes after removal:', element.className);
      } else {
        console.error('Element not found!');
      }
    });


    //Delete button
    await this.page.waitForSelector('.relative.flex.justify-center.items-center.cursor-pointer', { state: 'visible' });

    await this.page.evaluate(() => {
      const elements = document.querySelectorAll('.relative.flex.justify-center.items-center.cursor-pointer') as NodeListOf<HTMLElement>;

      if (elements.length > 0) {
        console.error(`Found ${elements.length} elements! Removing...`);
        elements.forEach(element => {
          element.remove();
        });
      } else {
        console.error('No elements found!');
      }
    });




    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector('#playButton', { state: 'visible' });
    await this.page.waitForTimeout(3000);

    // Try to force the click
    await this.playButton.click({ force: true });


    await expect(this.page.getByText("RANDOM")).toBeVisible();



    /*
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
*/
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
