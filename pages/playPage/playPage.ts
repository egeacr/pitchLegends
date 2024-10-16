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
  private defeatText: Locator;
  private homeButton: Locator;
  private leaveButton: Locator;
  private quitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.playButton = page.locator("#playButton");
    this.randomNameButton = page.getByRole("button", { name: "RANDOM" });
    this.nameInputField = page.getByPlaceholder("...");
    this.confirmButton = page.getByRole("button", { name: "CONFIRM" });
    this.enterNameText = page.getByText("ENTER A NAME");
    this.settingsButton = page.locator("//p[normalize-space()='Settings']");
    this.deleteAccountButton = page.locator("//p[normalize-space()='Delete Account']");
    this.deleteButtonPopUp = page.locator("//p[normalize-space()='Delete']");
    this.defeatText = page.getByText("DEFEAT");
    this.homeButton = page.getByText("HOME");
    this.leaveButton = page.getByRole("button", { name: "Leave" });
    this.quitButton = page.getByText("QUIT");
  }

  async exitGame() {
    await this.quitButton.waitFor(); //each click can be identified later on
    await this.quitButton.click();
    await this.leaveButton.waitFor();
    await this.leaveButton.click();
    await this.defeatText.waitFor();
    await this.defeatText.click();
    await this.homeButton.waitFor();
    await this.homeButton.click();
  }

  async openNamePopup() {
    await this.playButton.waitFor();
    await expect(async () => {
      if (
        (await this.playButton.isVisible()) &&
        (await this.playButton.isEnabled())
      ) {
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
    await this.nameInputField.clear();
    await this.nameInputField.fill("test-foe-account");
  }

  //TODO : Check if needed or not
  async startTheGame() {
    if (
      (await this.playButton.isVisible()) &&
      (await this.playButton.isEnabled())
    ) {
      await this.playButton.click({ force: true });
    } else {
      console.error("Play button is not visible or enabled.");
    }
  }

  async deleteAccount() {
    await this.settingsButton.waitFor();
    await this.settingsButton.click({ force: true });
    await this.deleteAccountButton.waitFor();
    await this.deleteAccountButton.click({ force: true });
    await this.deleteButtonPopUp.waitFor();
    await this.deleteButtonPopUp.click({ force: true });
    await this.waitPageLoad();
    await this.playButton.waitFor();
  }
}
