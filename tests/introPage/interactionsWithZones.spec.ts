import { test } from "../../fixtures/pomFixtures";
test.setTimeout(300000);


test.describe("Test Scenarios for Interaction with Zone in Intro Page", async () => {
    test.beforeEach(async ({ homePage, registerPage, introductionPage }) => {
        await homePage.openHomePage();
        await homePage.openRegisterPage();
        await registerPage.clickPlayButton();
        await introductionPage.clickNextButton();
    });
    test("Verify that the zones are displayed on the Introduction Page", async ({ gamePage, popUpVerify }) => {
        await gamePage.dragPlayerToSelectedField(1, "forward-intro")
        await gamePage.verifyPlayerDraggedToSelectedField("forward")
        await popUpVerify.verifyPopUpDisplay()
        await gamePage.dragPlayerToSelectedField(4, "middlefield-intro")
        await popUpVerify.clickEndTurnButton()
        await popUpVerify.verifyZonesInteractions()
    });

    test.afterEach(async ({ context }, testInfo) => {
        await context.close()
        console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
    })

});