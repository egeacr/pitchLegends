import { test } from "../../fixtures/pomFixtures";


test.describe("Intro Page Pop-Up Verifications", async () => {
    test.beforeEach(async ({ homePage, registerPage, introductionPage }) => {
        await homePage.openHomePage();
        await homePage.openRegisterPage();
        await registerPage.clickPlayButton();
        await introductionPage.clickNextButton();

    });
    test("Pop-Up Verify in Introduction Page", async ({ gamePage, popUpVerify, introductionPage }) => {
        await gamePage.dragPlayerToSelectedField(1, "forward")
        await gamePage.verifyPlayerDraggedToSelectedField("forward")
        await popUpVerify.verifyPopUpDisplay()
    });

    test.afterEach(async ({ context }, testInfo) => {
        await context.close()
        console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
    })

});