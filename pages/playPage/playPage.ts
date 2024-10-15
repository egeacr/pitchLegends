import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class PlayPage extends BasePage {
  readonly page: Page;
  private playButton: Locator;
  private randomNameButton: Locator;
  private confirmButton: Locator;
  private nameInputField: Locator;
  private enterNameText: Locator;
  private settingsButton: Locator;
  private deleteAccountButton: Locator;
  private deleteButtonPopUp: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.playButton = page.locator("#playButton");
    this.randomNameButton = page.getByRole("button", { name: "RANDOM" });
    this.nameInputField = page.getByPlaceholder("...");
    this.confirmButton = page.getByRole("button", { name: "CONFIRM" });
    this.enterNameText = page.getByText("ENTER A NAME");
    this.settingsButton = page.getByRole("button", { name: "Settings" });
    this.deleteAccountButton = page.getByRole("button", { name: "DELETE ACCOUNT" });
    this.deleteButtonPopUp = page.getByRole("button", { name: "Delete" });
  }

  async openNamePopup() {
    await this.playButton.waitFor();
    await expect(async () => {
      if (await this.playButton.isVisible() && await this.playButton.isEnabled()) {
        await this.playButton.click({ force: true });
      } else {
        console.error("Play button is not visible or enabled.");
      }
    }).toPass({
      intervals: [1_000, 1_000, 1_000, 1_000, 1_000, 1_000, 1_000],
      timeout: 60_000,
    });

    await this.page.waitForTimeout(2000);
  }


  async generateRandomName() {
    await this.randomNameButton.click();
    await expect(this.nameInputField).not.toBeEmpty();
  }

  async confirmName() {
    await this.confirmButton.waitFor();
    await this.confirmButton.click();
  }

  async fillName() {
    await this.nameInputField.clear()
    await this.nameInputField.fill("test-foe-account");
  }

  //TODO : Check if needed or not
  async startTheGame() {
    if (await this.playButton.isVisible() && await this.playButton.isEnabled()) {
      await this.playButton.click({ force: true });
    } else {
      console.error("Play button is not visible or enabled.");
    }
  }

  async deleteAccount() {
    await this.settingsButton.waitFor();
    await this.settingsButton.click();
    await this.deleteAccountButton.waitFor();
    await this.deleteAccountButton.click();
    await this.deleteButtonPopUp.waitFor();
    await this.deleteButtonPopUp.click();
    await this.waitPageLoad();
    await this.playButton.waitFor();
  }

}
