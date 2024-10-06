import { expect } from "../../fixtures/pomFixtures";
import { test } from "../../fixtures/pomFixtures";
import {
  pageTitle,
  successfulLoginCredentials,
  unsuccessfulLoginCredentials,
} from "../../utils/expectedEnums";
import { loginPageInputErrorMessages } from "../../utils/expectedEnums";

test.describe("Login Test Scenarios", async () => {
  test("Listening console errors", async ({ homePage }) => {
    await homePage.openHomePage();
    const consoleErrors = await homePage.listenConsoleErrors();
    const pageErrors = await homePage.listenPageErrors();

    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      console.log(consoleErrors);
      console.log(pageErrors);
      test.fail();
    }
  });
});
