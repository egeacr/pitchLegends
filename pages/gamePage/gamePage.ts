import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class GamePage extends BasePage {
  readonly page: Page;
  private quitButton: Locator;
  private endTurnButton: Locator;
  private vsIcon: Locator;
  private progressBar: Locator;
  private defenceRegion: Locator;
  private middlefieldRegion: Locator;
  private forwardRegion: Locator;
  private allPlayerCards: Locator;
  private playerInfoMap: Map<string, string>;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.quitButton = page.getByText("QUIT");
    this.endTurnButton = page.getByText("END TURN");
    this.vsIcon = page
      .locator("div")
      .filter({ hasText: /^TURN 1\/5$/ })
      .locator("img");

    this.defenceRegion = page.locator("(//div[@class='w-full h-1/3']//*[contains(@class,'bg-green')])[3]")
    this.middlefieldRegion = page.locator("(//div[@class='w-full h-1/3']//*[contains(@class,'bg-green')])[2]")
    this.forwardRegion = page.locator("(//div[@class='w-full h-1/3']//*[contains(@class,'bg-green')])[1]")
    this.allPlayerCards = page.locator("//*[contains(@class,'transition-all')]/div[@role='button']")

    this.playerInfoMap = new Map();
  }

  async confirmGameStart() {
    await expect(this.quitButton).toBeVisible({ timeout: 20000 });
    await expect(this.endTurnButton).toBeVisible({ timeout: 20000 });
    await expect(this.vsIcon).toBeVisible({ timeout: 20000 });
  }

  async dragPlayerToSelectedField(playerNumber: number, area: String){
    await this.page.waitForTimeout(7000)
    let selectedPlayerName = await this.page.locator("(//*[contains(@class,'transition-all')]/div[@role='button'])["+playerNumber+"]//div[contains(@class,'text')]/p").textContent()
    this.playerInfoMap.set("selectedPlayerName", selectedPlayerName ?? "");

  console.log("Selected player name is:" +selectedPlayerName )
    switch(area.toLowerCase()){
      case "defence":
        await this.allPlayerCards.nth(playerNumber-1).dragTo(this.defenceRegion)
        break;
      case "middlefield":
        await this.allPlayerCards.nth(playerNumber-1).dragTo(this.middlefieldRegion)
        break;
      case "forward":
        await this.allPlayerCards.nth(playerNumber-1).dragTo(this.forwardRegion)
        break;
      default:
        throw new Error(`Unknown area: ${area}`);
    }
  }



  async verifyPlayerDraggedToSelectedField(area: String){
    let selectedPlayerName = this.playerInfoMap.get("selectedPlayerName");
    console.log("player name is= " + selectedPlayerName)

    switch(area.toLowerCase()){
      case "defence":
        expect(await this.page.locator("(//div[@class='w-full h-1/3'])[3]//p[normalize-space()='"+selectedPlayerName+"']").isVisible()).toBeTruthy()
        break;
      case "middlefield":
        expect(await this.page.locator("(//div[@class='w-full h-1/3'])[2]//p[normalize-space()='"+selectedPlayerName+"']").isVisible()).toBeTruthy()
        break;
      case "forward":
        expect(await this.page.locator("(//div[@class='w-full h-1/3'])[1]//p[normalize-space()='"+selectedPlayerName+"']").isVisible()).toBeTruthy()
        break;
      default:
        throw new Error(`Unknown area: ${area}`);
    }
    
  }
}
