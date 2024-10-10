import { expect } from "../../fixtures/pomFixtures";
import { test } from "../../fixtures/pomFixtures";
import { RegisterPage } from "../../pages/registerPage/registerPage";
import { introductionPageTexts, pageTitle, pageURL, registerPageErrorMessages, successfulLoginCredentials } from "../../utils/expectedEnums";
import { fakerFunctions } from "../../utils/faker";


test.describe('Register Tests', async () => {

    test.beforeEach(async ({ homePage, registerPage }) => {
        await homePage.openHomePage()
        await homePage.openRegisterPage()
    })

    test.skip('Register with existing email', async ({ registerPage }) => {
        await registerPage.acceptAllCookies()
        await registerPage.fillNameField(fakerFunctions.generateName())
        await registerPage.fillPasswordField(fakerFunctions.generatePassword())
        await registerPage.fillEmailField(successfulLoginCredentials.MAIL)
        await registerPage.checkTermsAndPrivacy()
        await registerPage.clickRegisterButton()

        expect(await registerPage.getErrorMessage()).toBe(registerPageErrorMessages.EXISTING_MAIL)
    })

    test.skip('Click Google Login Button', async ({ registerPage, loginPage }) => {
        await registerPage.acceptAllCookies()
        await registerPage.clickGoogleRegisterButton()
        await registerPage.fillEmailAtGoogleRegisterPage(successfulLoginCredentials.MAIL)
        await registerPage.fillPasswordAtGoogleRegisterPage(successfulLoginCredentials.GOOGLE_MAIL_PASSWORD)

        expect(await loginPage.getPageTitle()).toBe('Home - Pitch Legends')

    })

    test('Open Google Register Page', async ({ registerPage,basePage }) => {
        const expectedPartOfURL = "accounts.google"
        const expectedPageTitle = "Sign in - Google Accounts"
        await registerPage.clickGoogleRegisterButton()
        await basePage.verifyPageURLContains(expectedPartOfURL)
        await basePage.verifyPageTitle(expectedPageTitle)
    })

    test('Open Facebook Register Page', async ({ registerPage,basePage }) => {
        const expectedPartOfURL = "facebook.com"
        const expectedPageTitle = "Log in to Facebook"
        await registerPage.clickFacebookRegisterButton()
        await basePage.verifyPageURLContains(expectedPartOfURL)
        await basePage.verifyPageTitle(expectedPageTitle)
    })

    test('Open Apple Register Page', async ({ registerPage,basePage }) => {
        const expectedPartOfURL = "appleid.apple.com"
        const expectedPageTitle = "Sign in to Apple Account"
        await registerPage.clickAppleRegisterButton()
        await basePage.verifyPageURLContains(expectedPartOfURL)
        await basePage.verifyPageTitle(expectedPageTitle)
    })

    test('Redirect Introduction Page With Play Button', async ({ basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://play.pitchlegends.com/introduction'
        await registerPage.clickPlayButton()
        expect(await introductionPage.isIntroductionPageOpened()).toBeTruthy()
        expect(await introductionPage.getHeaderText()).toEqual(introductionPageTexts.headerText)
        await basePage.verifyPageURL(expectedUrl)
    })

    test('Navigation to Game Introduction', async ({ basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://play.pitchlegends.com/game/introduction'
        await registerPage.clickPlayButton()
        await introductionPage.clickNextButton()
        await basePage.verifyPageURL(expectedUrl)
    })

    test('Return to Home Page', async ({ homePage, basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://pitchlegends.com/'
        await basePage.navigateBetweenPages(homePage)
        await introductionPage.clickHomeButton()
        await basePage.verifyPageURL(expectedUrl)
    })

    test('Verify Step-Into Page Accessibility', async ({ basePage, registerPage, introductionPage }) => {
        await registerPage.clickPlayButton()
        await introductionPage.clickNextButton()
        await introductionPage.clickQuitButton()
        await introductionPage.clickLeaveButton()
    })

    test.skip('Return to Main Page', async ({ homePage, basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://play.pitchlegends.com/'
        await basePage.navigateBetweenPages(homePage)
        await introductionPage.clickHomeButton()
        await basePage.verifyPageURL(expectedUrl)
    })


    test.afterEach(async ({ context }, testInfo) => {
        //await context.close()
        console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
    })






})