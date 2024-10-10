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
    this.quitButton = page.getByText("QUIT");
    this.endTurnButton = page.getByText("END TURN");
    this.vsIcon = page
      .locator("div")
      .filter({ hasText: /^TURN 1\/5$/ })
      .locator("img");
  }

  async confirmGameStart() {
    await expect(this.quitButton).toBeVisible({ timeout: 20000 });
    await expect(this.endTurnButton).toBeVisible({ timeout: 20000 });
    await expect(this.vsIcon).toBeVisible({ timeout: 20000 });
  }
}
