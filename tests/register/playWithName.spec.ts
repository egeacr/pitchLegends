import { expect } from "../../fixtures/pomFixtures";
import { test } from "../../fixtures/pomFixtures";
import { fakerFunctions } from "../../utils/faker";
test.setTimeout(200000);

test.describe("Register Tests", async () => {
  test.beforeEach(async ({ homePage, registerPage, introductionPage }) => {
    await homePage.openHomePage();
    await homePage.openRegisterPage();
    await registerPage.clickPlayButton();
    await introductionPage.clickNextButton();
    await introductionPage.clickQuitButton();
    await introductionPage.clickLeaveButton();
    await introductionPage.clickOpenButton();
    await introductionPage.clickInnernextButton();
    await introductionPage.clickOkayButton();
    await introductionPage.clickOnDiamond();
  });

  test("Generate Random Name & Confirm", async ({ playPage }) => {
    await playPage.openNamePopup(); //opens up name genrator pop up window and checks for elements visible
    await playPage.generateRandomName(); //clicks on the name generator button and then waits for input field to be filled with text
    await playPage.confirmRandomName();
  });

  test("Game starts in 20 seconds", async ({ playPage, gamePage }) => {
    await playPage.openNamePopup(); //opens up name genrator pop up window and checks for elements visible
    await playPage.generateRandomName(); //clicks on the name generator button and then waits for input field to be filled with text
    await playPage.confirmRandomName();
    await gamePage.confirmGameStart();
  });
});
