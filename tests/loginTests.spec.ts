import { expect } from "../fixtures/pomFixtures";
import { test } from "../fixtures/pomFixtures";
import { pageTitle, successfulLoginCredentials, unsuccessfulLoginCredentials } from "../utils/expectedEnums";


test.beforeEach(async ({ homePage, registerPage }) => {
    await homePage.openHomePage()
    await homePage.openRegisterPage()
    await registerPage.openLoginPage()
    await registerPage.acceptAllCookies()
})

test.describe("Login Test Scenarios", async () => {

    test("Unsuccessful Login - Invalid Email&Invalid Password", async ({loginPage})=>{
        await loginPage.loginWithCredentials(
            unsuccessfulLoginCredentials.MAIL,
            unsuccessfulLoginCredentials.PASSWORD
        )
        await loginPage.clickLoginButton()
        expect(await loginPage.getInvalidEmailOrPasswordAlertText()).toBe('Invalid username or password')
    })

    test("Unsuccessful Login - Valid Email&Invalid Password", async ({loginPage})=>{
        await loginPage.loginWithCredentials(
            successfulLoginCredentials.MAIL,
            unsuccessfulLoginCredentials.PASSWORD
        )
        await loginPage.clickLoginButton()
        expect(await loginPage.getInvalidEmailOrPasswordAlertText()).toBe('Invalid username or password')
    })

    test("Unsuccessful Login - Invalid Email&Valid Password", async ({loginPage})=>{
        await loginPage.loginWithCredentials(
            unsuccessfulLoginCredentials.MAIL,
            successfulLoginCredentials.PASSWORD
        )
        await loginPage.clickLoginButton()
        expect(await loginPage.getInvalidEmailOrPasswordAlertText()).toBe('Invalid username or password')
    })


    test("Successful Login", async ({loginPage})=>{
        await loginPage.loginWithCredentials(
            successfulLoginCredentials.MAIL,
            successfulLoginCredentials.PASSWORD
        )
        await loginPage.clickLoginButton()
        expect(await loginPage.getPageTitle()).toBe(pageTitle.TEAM_NAME)
    })
})

test.afterEach(async ({ context }, testInfo) => {
    //await context.close()
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
})

