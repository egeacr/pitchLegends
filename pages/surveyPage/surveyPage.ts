import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class SurveyPage extends BasePage {
  readonly page: Page;
  private surveyHeader: Locator
  private sendSurveyButton: Locator
  private skipSurveyButton: Locator
  private victoryLabel: Locator
  private finishTutorialText : Locator
  private selectOptionMessage: Locator

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.surveyHeader = page.locator("//h4[normalize-space()='What do you think of the game and intro?']")
    this.sendSurveyButton = page.getByRole('button', {name: 'SEND'})
    this.skipSurveyButton = page.getByRole('button', {name: 'SKIP'})
    this.victoryLabel = page.getByText("VICTORY")
    this.selectOptionMessage = page.locator("//div[@role='status' and @aria-live='polite']")
    this.finishTutorialText = page.getByText("You finished the tutorial!")
  }

  async clickSkipButton() {
    await this.finishTutorialText.click()
    await this.surveyHeader.waitFor()
    await this.skipSurveyButton.click()
    expect(await this.victoryLabel).toBeVisible()
  }

  async clickSendButtonWithoutAnySelection() {
    await this.finishTutorialText.click()
    await this.sendSurveyButton.click()
    expect(await this.selectOptionMessage.textContent()).toBe("Please select an option to continue.")
  }



}