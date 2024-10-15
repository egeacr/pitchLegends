import { expect } from "../../fixtures/pomFixtures";
import { test } from "../../fixtures/pomFixtures";

test.describe("Login Test Scenarios", async () => {
  test("Listening console errors", async ({
    homePage,
    gamePage,
    introductionPage,
    registerPage,
    playPage,
    loginPage,
  }) => {
    // Listen for console errors and page errors
    const consoleErrors = await homePage.listenConsoleErrors();
    const pageErrors = await homePage.listenPageErrors();

    // Open the home page
    await homePage.openHomePage();

    // Wait for the page to fully load
    await homePage.waitPageLoad();

    //go to register page

    await homePage.openRegisterPage();

    //wait for page load
    await homePage.waitPageLoad();

    await registerPage.clickPlayButton();
    await introductionPage.clickNextButton();
    await introductionPage.clickQuitButton();
    await introductionPage.clickLeaveButton();
    await introductionPage.clickOpenButton();
    await introductionPage.clickInnernextButton();
    await introductionPage.clickOkayButton();
    await introductionPage.waitForDiamond();
    await introductionPage.clickOnDiamond();
    await playPage.startTheGame();

    // Check if there are any console or page errors
    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      // If errors are found, log them again for clarity
      console.log(consoleErrors);
      console.log(pageErrors);
      // Mark the test as failed due to errors-
    }
  });
});
