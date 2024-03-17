import { expect } from "../../fixtures/pomFixtures";
import { test } from "../../fixtures/pomFixtures";
import { pageTitle, pageURL, registerPageErrorMessages, successfulLoginCredentials } from "../../utils/expectedEnums";
import { fakerFunctions } from "../../utils/faker";


test.describe('Register Tests', async() =>{

    test.beforeEach(async ({ homePage, registerPage }) => {
        await homePage.openHomePage()
        await homePage.openRegisterPage()
    })

    test('Register with existing email', async({registerPage})=> {
        await registerPage.acceptAllCookies()
        await registerPage.fillNameField(fakerFunctions.generateName())
        await registerPage.fillPasswordField(fakerFunctions.generatePassword())
        await registerPage.fillEmailField(successfulLoginCredentials.MAIL)
        await registerPage.checkTermsAndPrivacy()
        await registerPage.clickRegisterButton()
        
        expect(await registerPage.getErrorMessage()).toBe(registerPageErrorMessages.EXISTING_MAIL)
    })

    test('Click Google Login Button', async({registerPage,loginPage})=>{
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

    test.afterEach(async ({ context }, testInfo) => {
        //await context.close()
        console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
    })
    

    



})