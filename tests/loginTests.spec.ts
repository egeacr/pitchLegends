import { expect } from "../fixtures/pomFixtures";
import { test } from "../fixtures/pomFixtures";
import { login } from "../utils/expectedEnums";


test.beforeEach(async ({ homePage, loginPage }) => {
    await homePage.openHomePage()
    await loginPage.clickPlayFreeButton()
    await loginPage.clickSignInButton()
})

test.describe("Login Test Scenarios", async () => {
    test("Succesful Login", async ({ loginPage }) => {
        await loginPage.loginWithCredentials(
            login.MAIL,
            login.PASSWORD)
    })
    test("UnSuccesful Login", async ({ loginPage }) => {
        await loginPage.loginWithCredentials(
            login.MAIL,
            login.PASSWORD)
    })
})

test.afterEach(async ({ context }, testInfo) => {
    await context.close()
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
})

