import { Locator, Page } from "@playwright/test";

export default class BasePage {
   readonly page: Page

   constructor(page: Page) {
      this.page = page
   }

   async getPageTitle(): Promise<string> {
      return await this.page.title()
   }

   async getPageURL(): Promise<string> {
      return await this.page.url()
   }
}


