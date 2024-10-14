import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../basePage/basePage";

export class PlayPage extends BasePage {
  readonly page: Page;
  private playButton: Locator;
  private randomNameButton: Locator;
  private confirmButton: Locator;
  private nameInputField: Locator;
  private enterNameText: Locator;
  private playButton2: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.playButton = page.locator("#playButton");
    this.playButton2 = page.locator('xpath=//*[@id="playButton"]/img[2]');
    this.randomNameButton = page.getByRole("button", { name: "RANDOM" });
    this.nameInputField = page.getByPlaceholder("...");
    this.confirmButton = page.getByRole("button", { name: "CONFIRM" });
    this.enterNameText = page.getByText("ENTER A NAME");
  }

  async openName1Popup() {
    await this.page.waitForTimeout(2000);

    // Delete shadow element
    await this.page.evaluate(() => {
      const element = document.querySelector(
        ".relative.flex.justify-center.items-center.p-0.consistently-get-big-and-small"
      ) as HTMLElement;
      if (element) {
        console.log("Shadow element found! Removing style...");
        element.removeAttribute("style");
      } else {
        console.error("Shadow element not found!");
      }
    });

    // Remove other classes
    await this.page.evaluate(() => {
      const element = document.querySelector(
        ".relative.flex.justify-center.items-center.p-0"
      );
      if (element) {
        console.log("Removing class: consistently-get-big-and-small");
        element.classList.remove("consistently-get-big-and-small");
      } else {
        console.error("Element not found for removing class!");
      }
    });

    // Remove fixed z-index element
    await this.page.evaluate(() => {
      const element = document.querySelector(
        '[style*="position: fixed; z-index: 9999;"]'
      ) as HTMLElement;
      if (element) {
        console.log("Fixed z-index element found! Removing style...");
        element.removeAttribute("style");
      } else {
        console.error("Fixed z-index element not found!");
      }
    });

    // Delete glow-effect elements
    await Promise.all([
      this.page.evaluate(() => {
        const element = document.querySelector(
          ".absolute.glow-effect-purple"
        ) as HTMLElement;
        if (element) {
          console.log("Glow effect purple found! Removing classes...");
          element.className = ""; // Tüm class'ları kaldır
        } else {
          console.error("Glow effect purple not found!");
        }
      }),
      this.page.evaluate(() => {
        const element = document.querySelector(
          ".absolute.glow-effect-yellow"
        ) as HTMLElement;
        if (element) {
          console.log("Glow effect yellow found! Removing classes...");
          element.className = ""; // Tüm class'ları kaldır
        } else {
          console.error("Glow effect yellow not found!");
        }
      }),
    ]);

    // Delete buttons
    await this.page.waitForSelector(
      ".relative.flex.justify-center.items-center.cursor-pointer",
      { state: "visible" }
    );
    await this.page.evaluate(() => {
      const elements = document.querySelectorAll(
        ".relative.flex.justify-center.items-center.cursor-pointer"
      ) as NodeListOf<HTMLElement>;
      if (elements.length > 0) {
        console.log(
          `Found ${elements.length} cursor-pointer elements! Removing...`
        );
        elements.forEach((element) => {
          element.remove();
        });
      } else {
        console.error("No cursor-pointer elements found!");
      }
    });

    // Wait for play button
    await this.page.waitForTimeout(10000);
    await this.page.waitForSelector("#playButton", { state: "visible" });

    // Click play button
    await this.playButton.click({ force: true });

    await this.page.waitForTimeout(5000);

    // Wait for pop-up
    await this.page.waitForSelector(
      ".fixed.top-0.left-0.w-full.min-h-screen.justify-center.items-center.flex.bg-black.bg-opacity-50.px-4.invisible-to-visible-opacity",
      { state: "visible" }
    );

    // Check for the pop-up
    await this.page.evaluate(() => {
      const popup = document.querySelector(
        ".fixed.top-0.left-0.w-full.min-h-screen.justify-center.items-center.flex.bg-black.bg-opacity-50.px-4.invisible-to-visible-opacity"
      ) as HTMLElement;
      if (popup) {
        console.log("Pop-up found! Checking styles...");
        const zIndex = window
          .getComputedStyle(popup)
          .getPropertyValue("z-index");
        console.log("Current z-index:", zIndex);
      } else {
        console.error("Pop-up not found!");
      }
    });

    // Verify random text visibility
    await expect(this.page.getByText("RANDOM")).toBeVisible();
  }

  async openNamePopup() {
    await this.playButton.waitFor();
    await expect(async () => {
      if (
        (await this.playButton.isVisible()) &&
        (await this.playButton.isEnabled())
      ) {
        await this.playButton2.click({ force: true });
      } else {
        console.error("Play button is not visible or enabled.");
      }
    }).toPass({
      // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
      // ... Defaults to [100, 250, 500, 1000].
      intervals: [1_000, 1_000, 1_000, 1_000, 1_000, 1_000, 1_000],
      timeout: 60_000,
    });
  }

  async generateRandomName() {
    await this.openNamePopup();
    await this.randomNameButton.click();
    await expect(this.nameInputField).not.toBeEmpty();
  }

  async confirmRandomName() {
    await this.confirmButton.waitFor();
    await this.confirmButton.click();
  }

  async fillName() {
    await this.nameInputField.fill("test");
  }

  async startTheGame() {
    await this.playButton.waitFor();
    await this.playButton.click();
  }
}
