import { test } from "../../fixtures/pomFixtures";
test.setTimeout(100000);

test.describe("GamePlay Test Scenarios", async () => {
  const setupGamePlay = async ({ playPage, gamePage }) => {
    await playPage.waitPageLoad();
    await playPage.openNamePopup();
    await playPage.generateRandomName();
    await playPage.fillName();
    await playPage.confirmName();
    await gamePage.confirmGameStart();
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

  test("Verify that the Game starts in 20 seconds", async ({
    playPage,
    gamePage,
    introductionPage,
  }) => {
    await setupGamePlay({ playPage, gamePage });
    await playPage.exitGame();
    await playPage.deleteAccount();
  });

  test.skip("Verify that the account is deleted before exiting the game", async ({
    playPage,
    gamePage,
  }) => {
    await setupGamePlay({ playPage, gamePage });

    //TODO :
    //await playPage.deleteAccount();
  });

  test("Verify that place card defence position", async ({ playPage, gamePage }) => {
    await setupGamePlay({ playPage, gamePage })
    await gamePage.dragPlayerToSelectedField(1, "defence-game")
    await gamePage.verifyPlayerDraggedToSelectedField("defence")
    //TODO : 
    //await playPage.deleteAccount()
  });

  test("Verify that place card middlefield position", async ({ playPage, gamePage }) => {
    await setupGamePlay({ playPage, gamePage })
    await gamePage.dragPlayerToSelectedField(1, "middlefield-game")
    await gamePage.verifyPlayerDraggedToSelectedField("middlefield")
    //TODO : 
    //await playPage.deleteAccount()
  });

  test("Verify that place card forward position", async ({ playPage, gamePage }) => {
    await setupGamePlay({ playPage, gamePage })
    await gamePage.dragPlayerToSelectedField(1, "forward-game")
    await gamePage.verifyPlayerDraggedToSelectedField("forward")
    //TODO : 
    //await playPage.deleteAccount()
  });

  test.afterEach(async ({ context }, testInfo) => {
    await context.close();
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`);
  });
});
