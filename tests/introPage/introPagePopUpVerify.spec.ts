import { test } from "../../fixtures/pomFixtures";


test.describe("Test Scenarios for Introduction Page Pop-Up Verifications", async () => {
    test.beforeEach(async ({ homePage, registerPage, introductionPage }) => {
        await homePage.openHomePage();
        await homePage.openRegisterPage();
        await registerPage.clickPlayButton();
        await introductionPage.clickNextButton();

    });
    test("Verify that the Pop-Ups are displayed on the Introduction Page", async ({ gamePage, popUpVerify, introductionPage }) => {
        await gamePage.dragPlayerToSelectedField(1, "forward")
        await gamePage.verifyPlayerDraggedToSelectedField("forward")
        await popUpVerify.verifyPopUpDisplay()
    });

    test.afterEach(async ({ context }, testInfo) => {
        await context.close()
        console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
    })

});