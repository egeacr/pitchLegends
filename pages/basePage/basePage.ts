import { Locator, Page, expect } from "@playwright/test";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle(): Promise<string> {
    await this.page.waitForLoadState('domcontentloaded')
    return await this.page.title()
  }

  async getPageURL(): Promise<string> {

    this.waitUntilLoadingIconDisappear()
    await this.page.waitForLoadState('domcontentloaded')
    return await this.page.url()
  }

  async listenConsoleErrors() {
    const consoleErrors: any[] = [];
    await this.page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });
    return consoleErrors;
  }

  async listenPageErrors() {
    const pageErrors: any[] = [];
    await this.page.on("pageerror", (msg) => {
      pageErrors.push(msg);
    });
    return pageErrors;
  }

  //waits for both networkidle and page load . Both in a single function
  async waitPageLoad() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
  }

  async verifyPageURL(expectedUrl) {
    const url = this.page.url();
    const currentUrl = this.page.url();
    console.log(`Page URL: ${url}`);
    expect(currentUrl).toBe(expectedUrl);
  }

  //Navigate between page in main page
  async navigateBetweenPages() {
    await this.page.goto('/')
    const navigation = this.page.getByRole('navigation');

    // Define links to click with proper type for 'role'
    const linksToClick: { role?: "link", name?: string, text?: string }[] = [
      { role: 'link', name: 'Gameplay' },
      { text: 'Cards' },
      { text: 'Story' }
    ];

    for (const link of linksToClick) {
      if (link.role && link.name) {
        await navigation.getByRole(link.role, { name: link.name }).click();
      } else if (link.text) {
        await navigation.locator('li').filter({ hasText: link.text }).click();
      }
    }
  }



  async waitUntilLoadingIconDisappear() {
    await this.page.waitForSelector("//*[@class='rotating-image']", { state: 'hidden' });
    //Loading Icon Locator = //*[@class='rotating-image']
  }
}


