import { Locator, Page, expect } from "@playwright/test";
import { networkInterfaces } from "os";
import { promises as fs } from 'fs';


export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToUrl(url:string){
    await this.page.goto(url);
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
        consoleErrors.push(this.page.url());
      }
    });
    return consoleErrors;
  }

  async listenPageErrors() {
    const pageErrors: any[] = [];
    await this.page.on("pageerror", (msg) => {
      pageErrors.push(msg);
      pageErrors.push(this.page.url());
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

  async verifyPageURLContains(expectedUrl) {
   await this.waitPageLoad()
   await this.page.waitForTimeout(5000)
    const url = this.page.url();
   const currentUrl = await this.page.url();
   console.log(`Page URL: ${url}`);
   expect(currentUrl).toContain(expectedUrl);
 }

   async verifyPageTitle(expectedPageTitle) {
      await this.waitPageLoad()
      await this.page.waitForTimeout(5000)
      const title = await this.page.title()
      const currentTitle = await this.page.title();
      console.log(`Page Title: ${title}`)
      expect(currentTitle.replace(/\s/g, '')).toContain(expectedPageTitle.replace(/\s/g, ''))
   }

  //Navigate between page in main page
  async navigateBetweenPages(homePage) {
    await homePage.openHomePage()
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

  async waitUntilElementIsDisappear(element: Locator) {
    await element.waitFor({state: 'hidden'})
    //Loading Icon Locator = //*[@class='rotating-image']
  }


  async getLocalIP() {
    const nets = networkInterfaces();
    let localIP;
    const filePath = 'utils/IPAddresses.txt';
  
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]!) {
        if (net.family === 'IPv4' && !net.internal) {
          localIP = net.address;
          console.log(`IP Address is: ${localIP}`)
          await fs.appendFile(filePath, `${localIP}\n`);
          break;
        }
      }
    }
  }

}


