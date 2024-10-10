import {test as baseTest} from '@playwright/test'
import BasePage from '../pages/basePage/basePage'
import { RegisterPage } from '../pages/registerPage/registerPage'
import { HomePage } from '../pages/homePage/homePage'
import { LoginPage } from '../pages/loginPage/loginPage'

import { PlayPage } from '../pages/playPage/playPage'
import { IntroductionPage } from '../pages/introductionPage/introductionPage'
import { GamePage } from '../pages/gamePage/gamePage'


type pages = {
    basePage : BasePage
    registerPage: RegisterPage
    homePage: HomePage
    loginPage: LoginPage
    playPage: PlayPage
    introductionPage: IntroductionPage
    gamePage:GamePage
}

const testPages = baseTest.extend<pages>({
    basePage: async({page}, use) => {
        await use(new BasePage(page))
    },
    registerPage: async({page}, use) => {
        await use(new RegisterPage(page))
    },
    homePage: async({page}, use) => {
        await use(new HomePage(page))
    },
    loginPage: async({page}, use) => {
        await use(new LoginPage(page))
    },
    playPage: async({page}, use) => {
        await use(new PlayPage(page))
    },
    introductionPage: async({page}, use) => {
        await use(new IntroductionPage(page))
    },
    gamePage: async({page}, use) => {
        await use(new GamePage(page))
    }
})

export const test = testPages
export const expect = testPages.expect