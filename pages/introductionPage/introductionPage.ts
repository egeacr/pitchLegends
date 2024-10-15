import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class IntroductionPage extends BasePage {
  readonly page: Page;
  private textHeader: Locator;
  private nextButton: Locator;
  private homeButton: Locator;
  private leaveButton: Locator;
  private quitButton: Locator;
  private openButton: Locator;
  private innerNextButton: Locator;
  private okayButton: Locator;
  private diamondButton: Locator;
  private endTurnButton: Locator;
  private endTurnButtonPopUp: Locator;
  private highestScoreWinsPopUp: Locator;
  private eachCardAddsScorePopUp: Locator;
  private only2EnergyPopup: Locator;
  private win2OutOf3PopUp: Locator;

  private itemToBeDragged: Locator;
  private itemToBeDraggedTo: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.textHeader = page.getByText("Face Julius In Your Tutorial!");
    this.nextButton = page.locator('a[href="/game/introduction"]');
    this.homeButton = page.getByRole("link", { name: "BACK TO HOME" });
    this.leaveButton = page.getByRole("button", { name: "Leave" });
    this.quitButton = page.getByText("QUIT");
    this.openButton = page.getByText("OPEN");
    this.innerNextButton = page.getByText("NEXT");
    this.okayButton = page.getByText("OKAY");
    this.diamondButton = page.getByRole("img", { name: "card" });
    this.endTurnButton = page.locator(
      "xpath = /html/body/div[4]/div/div[3]/div/div[2]/div[3]/div[2]"
    );
    this.endTurnButtonPopUp = page.getByText("NOW PRESS THE END TURN BUTTON");
    this.highestScoreWinsPopUp = page.getByText("HIGHEST SCORE WINS");
    this.eachCardAddsScorePopUp = page.getByText("EACH CARD ADDS SCORE");
    this.only2EnergyPopup = page.getByText(
      "YOU CAN ONLY PLAY CARDS WITH AN ENERGY LEVEL OF 2 OR LESS"
    );
    this.win2OutOf3PopUp = page.getByText("WIN 2 OUT OF 3 ZONES");

    this.itemToBeDragged = page.locator(
      "xpath = /html/body/div[4]/div/div[3]/div/div[1]/div[1]/div/div/img[2]"
    );
    this.itemToBeDraggedTo = page.locator(
      "xpath = /html/body/div[4]/div/div[2]/div/div[1]/div/div[1]"
    );
  }

  async isIntroductionPageOpened() {
    await this.nextButton.waitFor();
    return await this.nextButton.isVisible();
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  async clickLeaveButton() {
    await this.leaveButton.click();
  }

  async clickQuitButton() {
    await this.quitButton.click();
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  async clickOpenButton() {
    await this.openButton.click();
  }

  async clickInnernextButton() {
    await this.innerNextButton.click();
  }

  async clickOkayButton() {
    await this.okayButton.click();
  }

  async clickOnDiamond() {
    await this.diamondButton.click();
  }

  async waitForDiamond() {
    await this.diamondButton.waitFor();
  }
  async getHeaderText() {
    return await this.textHeader.textContent();
  }

  //TODO : Check if needed or not
  async dragAndDropFirstCard() {
    await this.itemToBeDragged.waitFor();
    await this.itemToBeDraggedTo.waitFor();
    await this.itemToBeDragged.dragTo(this.itemToBeDraggedTo);
  }

  //TODO : Check if needed or not
  async checkEndTurnPopUp() {
    await expect(this.endTurnButtonPopUp).toBeVisible();
  }

  async waitFor() {
    await this.page.waitForTimeout(5000);
  }
}
