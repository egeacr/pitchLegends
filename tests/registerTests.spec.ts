import { expect } from "../fixtures/pomFixtures";
import { test } from "../fixtures/pomFixtures";
import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";
import { pageTitle, pageURL, registerPageErrorMessages, successfulLoginCredentials } from "../utils/expectedEnums";
import { fakerFunctions } from "../utils/faker";


test.describe('Register Tests', async() =>{

    test.beforeEach(async ({ homePage, registerPage }) => {
        await homePage.openHomePage()
        await homePage.openRegisterPage()
    })

    test.skip('Register with existing email', async({registerPage})=> {
        await registerPage.fillNameField(fakerFunctions.generateName())
        await registerPage.fillPasswordField(fakerFunctions.generatePassword())
        await registerPage.fillEmailField(successfulLoginCredentials.MAIL)
        await registerPage.checkTermsAndPrivacy()
        await registerPage.clickRegisterButton()
        
        expect(await registerPage.getErrorMessage()).toBe(registerPageErrorMessages.EXISTING_MAIL)
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

    

    
    
    

    



})