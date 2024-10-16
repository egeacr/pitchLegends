import { Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";
//import { Solver } from "2captcha";

export class RegisterPage extends BasePage {
  readonly page: Page;
  private signInButton: Locator;
  private nameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private registerButton: Locator;
  private cookieModal: Locator;
  private acceptAllCookiesButton: Locator;
  private errorMessage: Locator;
  private termsAndPrivacyCheckbox: Locator;
  private googleRegisterButton: Locator;
  private facebookRegisterButton: Locator;
  private appleRegisterButton: Locator;

  //play button without any info (app register the user with unique id)
  private playWithoutAnyAccount: Locator;

  //burası googleLogin'e atılabilir
  private googleRegisterPage: Locator;
  private googleEmailInputField: Locator;
  private nextButtonAtGoogleEmailInput: Locator;
  private googlePasswordInputField: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.signInButton = page.getByRole("link", {
      name: "Already have an account? Sign in",
    });
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.emailInput = page.getByRole("textbox", { name: "email" });
    this.passwordInput = page.getByRole("textbox", { name: "password" });
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.cookieModal = page.locator(".cf_consent-buttons");
    this.acceptAllCookiesButton = page.locator(".cf_button cf_button--accept");
    this.errorMessage = page.locator("span.input-label");
    this.termsAndPrivacyCheckbox = page.locator("#terms_and_privacy");
    this.googleRegisterButton = page
      .getByRole("button")
      .filter({ hasText: "Sign In with Google" });
    this.googleRegisterPage = page.getByText("Sign in with Google");
    this.googleEmailInputField = page.locator("#identifierId");
    this.nextButtonAtGoogleEmailInput = page.getByRole("button", {
      name: "Next",
    });
    this.googlePasswordInputField = page.locator("//input[@type='password']");
    this.playWithoutAnyAccount = page
      .getByRole("button")
      .filter({ hasText: "Play" });
    this.facebookRegisterButton = page
      .getByRole("button")
      .filter({ hasText: "Sign In with Facebook" });
    this.appleRegisterButton = page
      .getByRole("button")
      .filter({ hasText: "Sign In with Apple" });
  }

  async openLoginPage() {
    await this.signInButton.click();
  }

  async fillNameField(name: string) {
    await this.nameInput.fill(name);
  }

  async fillEmailField(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPasswordField(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async acceptAllCookies() {
    await this.cookieModal.waitFor();
    await this.cookieModal.click();
    await this.page.keyboard.press("Escape");
    //await this.acceptAllCookiesButton.click()
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async checkTermsAndPrivacy() {
    await this.termsAndPrivacyCheckbox.check();
  }

  async clickGoogleRegisterButton() {
    await this.googleRegisterButton.click();
  }

  async fillEmailAtGoogleRegisterPage(email: string) {
    await this.googleEmailInputField.waitFor();
    await this.googleEmailInputField.fill(email);
    await this.nextButtonAtGoogleEmailInput.click();
    await this.page.waitForTimeout(1000);
  }

  async fillPasswordAtGoogleRegisterPage(password: string) {
    /*
       const solver = new Solver("a4f1d135d7fb5ef456263d9f031d9852")
        let pageURL = await this.getPageURL()
       

        const captchaFrame = await this.page.waitForSelector("iframe[src*='recaptcha/api2']");

       
        const captchaFrameContent = await captchaFrame.contentFrame();
        
    

        if (!captchaFrameContent) {
            console.error("CAPTCHA frame content is not available.");
            return;
        }

        const captchaCheckbox = await captchaFrameContent.waitForSelector("#recaptcha-anchor");
        await captchaCheckbox.click()

        const captchaResponse = await solver.recaptcha("6LdD2OMZAAAAAAv2xVpeCk8yMtBtY3EhDWldrBbh",pageURL);
        // CAPTCHA yanıtını doldur ve formu gönder
        const captchaInput = await captchaFrameContent.waitForSelector("#g-recaptcha-response");
    
        // captchaResponse bir string değilse uygun bir şekilde çıkart
    await captchaInput.evaluate((input, captchaResponse) => {
        if (input instanceof HTMLInputElement) {
          input.value = captchaResponse.toString();
        }
      }, captchaResponse);

    const submitButton = await captchaFrameContent.waitForSelector("button[type='submit']");
    await submitButton.click();

        
        await this.googlePasswordInputField.waitFor()
        await this.googlePasswordInputField.fill('FarukOnurEge1.')
        await this.page.keyboard.press('Enter')
        await this.page.waitForLoadState('networkidle')
        */
  }

  async clickPlayButton() {
    await this.playWithoutAnyAccount.click();
    await this.page.waitForURL("**/introduction");
  }


  async clickFacebookRegisterButton() {
    await this.facebookRegisterButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.waitUntilLoadingIconDisappear();
  }

  async clickAppleRegisterButton() {
    await this.appleRegisterButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.waitUntilLoadingIconDisappear();
  }
}
