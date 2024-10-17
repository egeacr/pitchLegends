import { test } from "../../fixtures/pomFixtures";
test.setTimeout(300000);

test.describe("Test Scenarios for Victory Screen in Intro Page", async () => {
    test.beforeEach(async ({ homePage, registerPage, introductionPage }) => {
        await homePage.openHomePage();
        await homePage.openRegisterPage();
        await registerPage.clickPlayButton();
        await introductionPage.clickNextButton();
    });
    test("Verify that Victory Screen is displayed on the Introduction Page", async ({ gamePage, popUpVerify }) => {
        await gamePage.dragPlayerToSelectedField(1, "forward-intro")
        await gamePage.verifyPlayerDraggedToSelectedField("forward")
        await popUpVerify.verifyPopUpDisplay()
        await gamePage.dragPlayerToSelectedField(4, "middlefield-intro")
        await popUpVerify.clickEndTurnButton()
        await popUpVerify.verifyZonesInteractions()
        await popUpVerify.verifyWinZoneScreen()
        await gamePage.dragPlayerToSelectedField(4, "defence-intro")
        await popUpVerify.clickEndTurnButton()
        await gamePage.dragPlayerToSelectedField(2, "middlefield-intro")
        await popUpVerify.clickEndTurnButton()
        await gamePage.dragPlayerToSelectedField(1, "defence-intro")
        await popUpVerify.clickEndGameButton()
        await popUpVerify.verifyVictoryScreen()
    });


    test("Verify that Survey Screen Is Opened After Victory - Skip", async ({ gamePage, popUpVerify, surveyPage }) => {
        await gamePage.dragPlayerToSelectedField(1, "forward-intro")
        await gamePage.verifyPlayerDraggedToSelectedField("forward")
        await popUpVerify.verifyPopUpDisplay()
        await gamePage.dragPlayerToSelectedField(4, "middlefield-intro")
        await popUpVerify.clickEndTurnButton()
        await popUpVerify.verifyZonesInteractions()
        await popUpVerify.verifyWinZoneScreen()
        await gamePage.dragPlayerToSelectedField(4, "defence-intro")
        await popUpVerify.clickEndTurnButton()
        await gamePage.dragPlayerToSelectedField(2, "middlefield-intro")
        await popUpVerify.clickEndTurnButton()
        await gamePage.dragPlayerToSelectedField(1, "defence-intro")
        await popUpVerify.clickEndGameButton()
        await popUpVerify.verifyVictoryScreen()
        await surveyPage.clickSkipButton()
    });

    test("Verify that Survey Screen Is Opened After Victory - Cannot Sent Empty Survey", async ({ gamePage, popUpVerify, surveyPage }) => {
        await gamePage.dragPlayerToSelectedField(1, "forward-intro")
        await gamePage.verifyPlayerDraggedToSelectedField("forward")
        await popUpVerify.verifyPopUpDisplay()
        await gamePage.dragPlayerToSelectedField(4, "middlefield-intro")
        await popUpVerify.clickEndTurnButton()
        await popUpVerify.verifyZonesInteractions()
        await popUpVerify.verifyWinZoneScreen()
        await gamePage.dragPlayerToSelectedField(4, "defence-intro")
        await popUpVerify.clickEndTurnButton()
        await gamePage.dragPlayerToSelectedField(2, "middlefield-intro")
        await popUpVerify.clickEndTurnButton()
        await gamePage.dragPlayerToSelectedField(1, "defence-intro")
        await popUpVerify.clickEndGameButton()
        await popUpVerify.verifyVictoryScreen()
        await surveyPage.clickSendButtonWithoutAnySelection()
    });


    test.afterEach(async ({ context }, testInfo) => {
        await context.close()
        console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
    })

});