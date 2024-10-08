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

    /*
    test('Without Checking Terms And Privacy Checbox', async({registerPage})=> {
       
    })

    test('Less than 6 chars for passwords field', async({registerPage})=> {
       
    })

    test('Without Name field', async({registerPage})=> {
       
    })

    test('Without email field', async({registerPage})=> {
       
    })*/

    test('Open Google Register Page', async ({ registerPage }) => {
        await registerPage.clickGoogleRegisterButton()
        expect(await registerPage.getPageURL()).toContain("accounts.google")
        expect(await registerPage.getPageTitle()).toBe('Sign in - Google Accounts')


    })

    test('Open Facebook Register Page', async ({ registerPage }) => {

        await registerPage.clickFacebookRegisterButton()
        expect(await registerPage.getPageURL()).toContain("facebook.com")
        expect(await registerPage.getPageTitle()).toBe('Log in to Facebook')

    })

    test('Open Apple Register Page', async ({ registerPage }) => {

        await registerPage.clickAppleRegisterButton()
        expect(await registerPage.getPageURL()).toContain("appleid.apple.com")
        console.log(await registerPage.getPageTitle())
        expect(JSON.stringify(await registerPage.getPageTitle())).toEqual(JSON.stringify("Sign in to Apple Account"))

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

    test('Return to Home Page', async ({ basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://pitchlegends.com/'
        await basePage.navigateBetweenPages()
        await introductionPage.clickHomeButton()
        await basePage.verifyPageURL(expectedUrl)
    })

    test.skip('Return to Main Page', async ({ basePage, registerPage, introductionPage }) => {
        const expectedUrl = 'https://play.pitchlegends.com/'
        await basePage.navigateBetweenPages()
        await introductionPage.clickHomeButton()
        await basePage.verifyPageURL(expectedUrl)
    })


    test.afterEach(async ({ context }, testInfo) => {
        //await context.close()
        console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
    })






})