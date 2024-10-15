import { test } from "../../fixtures/pomFixtures";

test.describe('Test Scenarios for Navigation Between Pages', async () => {
    test.beforeEach(async ({ homePage, registerPage, basePage }) => {
        await homePage.openHomePage()
        await homePage.openRegisterPage()
    })

    test('Redirect to the Introduction Page with the Play Button', async ({ basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://play.pitchlegends.com/introduction'
        await registerPage.clickPlayButton()
        await basePage.verifyPageURL(expectedUrl)
    })

    test('Navigation to the Game Introduction', async ({ basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://play.pitchlegends.com/game/introduction'
        await registerPage.clickPlayButton()
        await introductionPage.clickNextButton()
        await basePage.verifyPageURL(expectedUrl)
    })

    test('Return to the Home Page', async ({ homePage, basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://pitchlegends.com/'
        await basePage.navigateBetweenPages(homePage)
        await introductionPage.clickHomeButton()
        await basePage.verifyPageURL(expectedUrl)
    })

    test('Verify the accessibility of the Step-Into Page', async ({ basePage, registerPage, introductionPage }) => {
        await registerPage.clickPlayButton()
        await introductionPage.clickNextButton()
        await introductionPage.clickQuitButton()
        await introductionPage.clickLeaveButton()
    })

    test('Return to the Main Page', async ({ homePage, basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://pitchlegends.com/'
        await basePage.navigateBetweenPages(homePage)
        await introductionPage.clickHomeButton()
        await basePage.verifyPageURL(expectedUrl)
    })

    test.afterEach(async ({ context }, testInfo) => {
        await context.close()
        console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
    })

})