import { expect, Locator, Page } from "@playwright/test";

export class PopUpVerify {
    readonly page: Page;
    readonly endTurnButton: Locator
    readonly endGameButton: Locator

    constructor(page: Page) {
        this.page = page
        this.endTurnButton = page.locator('.bg-contain.cursor-pointer.relative.bg-center.flex.justify-center.items-center.bg-no-repeat.transition-all.duration-500.ease-in-out')
        this.endTurnButton = page.locator('.bg-contain.cursor-pointer.relative.bg-center.flex.justify-center.items-center.bg-no-repeat.transition-all.duration-500.ease-in-out')
    }

    async verifyPopUpDisplay() {
        const textsToCheck = [
            'NOW PRESS THE END TURN BUTTON',
            'HIGHEST SCORE WINS',
            'EACH CARD ADDS SCORE',
            'YOU CAN ONLY PLAY CARDS WITH AN ENERGY LEVEL OF 2 OR LESS'
        ];

        const verifyTextVisibility = async (text) => {
            const element = this.page.getByText(text);
            await this.page.waitForTimeout(4000)
            await expect(element).toBeVisible();
        };

        await verifyTextVisibility(textsToCheck[0]);

        await this.clickEndTurnButton()

        for (let i = 1; i < textsToCheck.length; i++) {
            await verifyTextVisibility(textsToCheck[i]);
            if (textsToCheck[i] == "EACH CARD ADDS SCORE") {
                //Click empty area
                await this.page.locator('div').filter({ hasText: /^14The Alien1455Bison$/ }).first().click();
            } else if (textsToCheck[i] == "YOU CAN ONLY PLAY CARDS WITH AN ENERGY LEVEL OF 2 OR LESS") {
                await this.page.getByText('YOU CAN ONLY PLAY CARDS WITH').click();

            }
        }
    }

    async clickEndTurnButton() {
        await this.page.waitForTimeout(5000)
        await this.page.locator('.bg-contain > div:nth-child(3)').click({ force: true });
    }

    async clickEndGameButton() {
        await this.page.waitForTimeout(5000)
        await this.page.locator('.bg-contain > div:nth-child(3)').click({ force: true });

    }

    async verifyWinZoneScreen() {
        await this.page.waitForTimeout(2000)
        await this.page.getByText('WIN 2 OUT OF 3 ZONES').click();
        await this.page.waitForTimeout(2000)
    }
    async verifyZonesInteractions() {
        const zones = ['Attack Zone', 'Midfield Zone', 'Defense Zone'];

        for (const zone of zones) {
            const zoneElement = this.page.getByText(zone);
            await expect(zoneElement).toBeVisible();
            await zoneElement.click();
        }
    }

    async verifyVictoryScreen() {
        await this.page.waitForTimeout(10000)
        const imageElement = this.page.locator('div').filter({ hasText: 'You finished the tutorial!' }).locator('img');
        await expect(imageElement).toBeVisible();

        const heading = this.page.getByRole('heading', { name: 'You finished the tutorial!' });
        await expect(heading).toBeVisible();

        const textElement = this.page.getByText('Congratulations! You have successfully completed the tutorial against Julius.');
        await expect(textElement).toBeVisible();
    }
}