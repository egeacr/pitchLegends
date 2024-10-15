import { expect, Locator, Page } from "@playwright/test";

export class PopUpVerify {
    readonly page: Page;
    readonly endTurnButton: Locator
    
    constructor(page: Page) {
        this.page = page
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
            await this.page.waitForTimeout(2000)
            await expect(element).toBeVisible();
        };

        await verifyTextVisibility(textsToCheck[0]);

        await this.endTurnButton.click();

        for (let i = 1; i < textsToCheck.length; i++) {
            await verifyTextVisibility(textsToCheck[i]);
            if (textsToCheck[i] == "EACH CARD ADDS SCORE") {
                //Click empty area
                await this.page.locator('div').filter({ hasText: /^14The Alien1455Bison$/ }).first().click();
            }
        }
    }


}