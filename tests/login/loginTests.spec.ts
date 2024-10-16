import { expect } from "../../fixtures/pomFixtures";
import { test } from "../../fixtures/pomFixtures";
import {
  pageTitle,
  successfulLoginCredentials,
  unsuccessfulLoginCredentials,
} from "../../utils/expectedEnums";
import { loginPageInputErrorMessages } from "../../utils/expectedEnums";

test.beforeEach(async ({ homePage, registerPage }) => {
  await homePage.openHomePage();
  await homePage.openRegisterPage();
  await registerPage.acceptAllCookies();
  await registerPage.openLoginPage();
});

test.describe("Login Test Scenarios", async () => {
  test.skip("Unsuccessful Login - Invalid Email&Invalid Password", async ({
    loginPage,
  }) => {
    await loginPage.loginWithCredentials(
      unsuccessfulLoginCredentials.MAIL,
      unsuccessfulLoginCredentials.PASSWORD
    );
    await loginPage.clickLoginButton();
    expect(await loginPage.getInvalidEmailOrPasswordAlertText()).toBe(
      "Invalid username or password"
    );
  });

  test.skip("Unsuccessful Login - Valid Email&Invalid Password", async ({
    loginPage,
  }) => {
    await loginPage.loginWithCredentials(
      successfulLoginCredentials.MAIL,
      unsuccessfulLoginCredentials.PASSWORD
    );
    await loginPage.clickLoginButton();
    expect(await loginPage.getInvalidEmailOrPasswordAlertText()).toBe(
      "Invalid username or password"
    );
  });

  test.skip("Unsuccessful Login - Invalid Email&Valid Password", async ({
    loginPage,
  }) => {
    await loginPage.loginWithCredentials(
      unsuccessfulLoginCredentials.MAIL,
      successfulLoginCredentials.PASSWORD
    );
    await loginPage.clickLoginButton();
    expect(await loginPage.getInvalidEmailOrPasswordAlertText()).toBe(
      "Invalid username or password"
    );
  });

  test.skip("Successful Login", async ({ loginPage }) => {
    await loginPage.loginWithCredentials(
      successfulLoginCredentials.MAIL,
      successfulLoginCredentials.PASSWORD
    );
    await loginPage.clickLoginButton();
    expect(await loginPage.getPageTitle()).toBe(pageTitle.TEAM_NAME);
  });

  test.skip("Assert Empty Email field message", async ({ loginPage }) => {
    await loginPage.loginWithCredentials(
      unsuccessfulLoginCredentials.EMPTY_MAIL,
      successfulLoginCredentials.PASSWORD
    );
    await loginPage.clickLoginButton();
    await loginPage.assertAllWarningMessages(
      loginPageInputErrorMessages.EMPTY_FIELD_EN,
      loginPageInputErrorMessages.EMPTY_FIELD_TR,
      loginPageInputErrorMessages.EMAIL,
      loginPageInputErrorMessages.EMAIL_
    );
  });

  test.skip("Assert @ symbol in the Email field message", async ({
    loginPage,
  }) => {
    await loginPage.loginWithCredentials(
      unsuccessfulLoginCredentials.MAIL_WITHOUT_CHAR,
      unsuccessfulLoginCredentials.PASSWORD
    );
    await loginPage.clickLoginButton();
    await loginPage.assertAllWarningMessages(
      loginPageInputErrorMessages.SPECIAL_CHARACTER_EN,
      loginPageInputErrorMessages.SPECIAL_CHARACTER_TR,
      loginPageInputErrorMessages.EMAIL,
      loginPageInputErrorMessages.EMAIL_
    );
  });

  test.skip("Assert Empty Password field message", async ({ loginPage }) => {
    await loginPage.loginWithCredentials(
      successfulLoginCredentials.MAIL,
      unsuccessfulLoginCredentials.EMPTY_PASSWORD
    );
    await loginPage.clickLoginButton();
    await loginPage.assertAllWarningMessages(
      loginPageInputErrorMessages.EMPTY_FIELD_EN,
      loginPageInputErrorMessages.EMPTY_FIELD_TR,
      loginPageInputErrorMessages.EMAIL,
      loginPageInputErrorMessages.EMAIL_
    );
  });
});

test.afterEach(async ({ context }, testInfo) => {
  await context.close();
  console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`);
});
