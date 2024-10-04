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
    const logs: {
      message: string;
      type: string;
    }[] = [];
    // Listen for all console events and handle errors
    this.page.on("console", (msg) => {
      if (msg.type() === "error") {
        logs.push({ message: msg.text(), type: msg.type() });
      }
    });
    return logs;
  }

  async listenPageErrors() {
    const errorMsg: {
      name: string;
      message: string;
    }[] = [];
    // Listen for all console events and handle errors
    //get the errors
    this.page.on("pageerror", (error) => {
      errorMsg.push({ name: error.name, message: error.message });
    });

    return errorMsg;
  }
}
