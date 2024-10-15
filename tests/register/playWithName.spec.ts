import { test } from "../../fixtures/pomFixtures";
test.setTimeout(100000);

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
    await introductionPage.waitForDiamond();
    await introductionPage.clickOnDiamond();
  });

  test("Verify Generating Random Name -> Continue with Test Name Account ", async ({ playPage, gamePage }) => {
    await playPage.waitPageLoad();
    await playPage.openNamePopup();
    await playPage.generateRandomName();
    await playPage.fillName();
    await playPage.confirmName();
    await gamePage.confirmGameStart()

    //TODO : 
    //await playPage.deleteAccount()
  });

  test("Verify that Game starts in 20 seconds", async ({ playPage, gamePage }) => {
    await playPage.openNamePopup();
    await playPage.fillName();
    await playPage.confirmName()
    await gamePage.confirmGameStart();
  });

  test.skip("Verify that Delete Account Before Exit", async ({ playPage, gamePage }) => {
    await playPage.openNamePopup();
    await playPage.fillName();
    await playPage.confirmName();
    await gamePage.confirmGameStart()

    //TODO :
    //await playPage.deleteAccount();
  });

  test.skip("Verify that Drag and drop the first card during the introduction", async ({ playPage, gamePage, introductionPage }) => {
    await introductionPage.dragAndDropFirstCard();
    await introductionPage.waitFor();
    await introductionPage.checkEndTurnPopUp();
  });

  test.afterEach(async ({ context }, testInfo) => {
    await context.close()
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
  })
});
