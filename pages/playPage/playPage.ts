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

    await expect(async () => {
        await this.waitPageLoad();
        await this.page.waitForSelector('#playButton', { state: 'visible' });
        // Click the button
        await this.page.$eval('#playButton', (element: HTMLElement) => {
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            });
            element.dispatchEvent(event);
        });
        //await this.playButton2.dispatchEvent("click");
        await expect(this.page.getByText("RANDOM")).toBeVisible();
      }).toPass({
        intervals: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
      });


    // await this.page.evaluate(() => {
    //   const button = document.querySelector("#playButton");
    //   button.style.zIndex = "9999";
    //   button.style.visibility = "visible";
    //   button.style.opacity = "1";
    //   // button.click();
    // });

    /*
        await this.page.evaluate(() => {
          // const element = document.querySelector('.relative.flex.justify-center.items-center.p-0');
          this.page.waitForTimeout(5000)
    
          const element = document.querySelector('.box-shadow:0px 0px 1000px 1000px rgba(0, 0, 0, 0.7))');
    
          //const element2 = document.querySelector('.box-shadow:0px 0px 1000px 1000px rgba(0, 0, 0, 0.7), inset 0px 20px 30px rgba(0, 0, 0, 0.7);filter:brightness(1.5);z-index:2');
          //style="box-shadow:0px 0px 1000px 1000px rgba(0, 0, 0, 0.7))"
    
          if (element) {
            element.classList.remove('0px 0px 1000px 1000px rgba(0, 0, 0, 0.7))');
            // element2.classList.remove('consistently-get-big-and-small');
    
          } else {
            console.error('Element not found!');
          }
        });
    
        //await this.page.getByText('9Play0ArenaBURN&').press('Tab');
        //await this.playButton.press('Enter');
    
        // await this.playButton.dispatchEvent("click");
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
