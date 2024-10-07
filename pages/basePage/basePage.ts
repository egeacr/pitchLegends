import { Locator, Page } from "@playwright/test";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle(): Promise<string> {
    await this.page.waitForURL("https://play.pitchlegends.com/");
    return await this.page.title();
  }

  async getPageURL(): Promise<string> {
    return await this.page.url();
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
}
