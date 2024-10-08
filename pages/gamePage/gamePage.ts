import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class GamePage extends BasePage {
  readonly page: Page;
  private quitButton: Locator;
  private endTurnButton: Locator;
  private vsIcon: Locator;
  private progressBar: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.quitButton = page.locator("//*[contains(@class, 'QUIT' )]//a");
    this.endTurnButton = page.locator(
      "xpath=/html/body/div[4]/div/div[3]/div/div[2]/div[3]/div[2]"
    );
    this.vsIcon = page.locator(
      "xpath=/html/body/div[4]/div/div[1]/div/div[2]/img"
    );
    this.progressBar = page.locator(
      "xpath=/html/body/div[3]/div/div[3]/div/div[2]/div[3]/div[2]/div"
    );
  }

  async confirmGameStart() {
    await expect(this.quitButton).toBeVisible({ timeout: 20000 });
    await expect(this.endTurnButton).toBeVisible({ timeout: 20000 });
    await expect(this.vsIcon).toBeVisible({ timeout: 20000 });
    await expect(this.progressBar).toBeVisible({ timeout: 20000 });
  }
}
