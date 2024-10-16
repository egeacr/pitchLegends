import { test } from "../../fixtures/pomFixtures";
import { HomePage } from "../../pages/homePage/homePage";
test.setTimeout(100000);

test.describe("GamePlay Test Scenarios", async () => {
  const setupGamePlay = async ({ playPage, gamePage }) => {
    await playPage.waitPageLoad();
    await playPage.openNamePopup();
    await playPage.generateRandomName();
  };


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
    await introductionPage.waitForDiamond();
    await introductionPage.clickOnDiamond();
  });

  test.skip("Verify the generation of a random name and continue with the test account name", async ({
    playPage,
    gamePage,
  }) => {
    await setupGamePlay({ playPage, gamePage });

    //TODO :
    //await playPage.deleteAccount()
  });

  test.skip("Verify that the Game starts in 20 seconds", async ({
    playPage,
    gamePage,
    introductionPage,
  }) => {
    await setupGamePlay({ playPage, gamePage });
    await playPage.fillName();
    await playPage.confirmName();
    await gamePage.confirmGameStart();
    await playPage.exitGame();
    await playPage.deleteAccount();
  });

  test("Verify that the account is deleted before exiting the game", async ({
    playPage,
    gamePage,
    homePage,
    introductionPage
  }) => {
    await setupGamePlay({ playPage, gamePage});
    await homePage.clickPlayButton();
    await introductionPage.isIntroductionPageOpened();
  });

  test.afterEach(async ({ context }, testInfo) => {
    await context.close();
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`);
  });
});
