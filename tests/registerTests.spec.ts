import { expect } from "../fixtures/pomFixtures";
import { test } from "../fixtures/pomFixtures";
import { HomePage } from "../pages/homePage";
import { RegisterPage } from "../pages/registerPage";
import { pageTitle, pageURL } from "../utils/expectedEnums";
import { fakerFunctions } from "../utils/faker";


test.describe(" Attempts to login with invalid credentials", async ()=>{

    test.beforeEach('Open Home Page', async({homePage})=>{
        await homePage.openHomePage()
        expect(await homePage.getPageTitle()).toBe(pageTitle.HOMEPAGE)
        expect(await homePage.getPageURL()).toBe(pageURL.HOMEPAGE)
    })

    test("Verify Invalid Email Error Message", async ({homePage, registerPage,loginPage})=>{
        await homePage.openRegisterPage()
        await registerPage.openLoginPage()
        await loginPage.loginWithCredentials('test@testcompany.com', 'invalidPassword123.')
        expect(await loginPage.getInvalidEmailOrPasswordAlertText()).toBe('Invalid username or password')
    })

})

test.describe(" Attempts to login with valid credentials", async ()=>{

    test.beforeEach('Open Home Page', async({homePage})=>{
        await homePage.openHomePage()
        expect(await homePage.getPageTitle()).toBe(pageTitle.HOMEPAGE)
        expect(await homePage.getPageURL()).toBe(pageURL.HOMEPAGE)
    })

    test("Verify User Logged In", async ({homePage, registerPage,loginPage})=>{
        await homePage.openRegisterPage()
        await registerPage.openLoginPage()
        await loginPage.loginWithCredentials('foetestuser@gmail.com', 'pitchLegends')
        expect(await loginPage.getPageTitle()).toBe(pageTitle.TEAM_NAME)
    })

})



test.describe('Register Tests', async() =>{

    test('Open Register Page', async({homePage,registerPage})=>{
        //await homePage.openHomePage()
        //await homePage.openRegisterPage()
        await registerPage.fillEmailField(fakerFunctions.generateEmail())
        
    })



})