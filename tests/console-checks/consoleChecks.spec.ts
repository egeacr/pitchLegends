import { expect } from "../../fixtures/pomFixtures";
import { test } from "../../fixtures/pomFixtures";

test.describe("Login Test Scenarios", async () => {
  test("Listening console errors", async ({ homePage }) => {
    // Listen for console errors and page errors
    const consoleErrors = await homePage.listenConsoleErrors();
    const pageErrors = await homePage.listenPageErrors();

    // Open the home page
    await homePage.openHomePage();

    // Wait for the page to fully load
    await homePage.waitPageLoad();

    // Log the collected console and page errors
    await console.log(consoleErrors);
    await console.log(pageErrors);

    // Check if there are any console or page errors
    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      // If errors are found, log them again for clarity
      console.log(consoleErrors);
      console.log(pageErrors);
      // Mark the test as failed due to errors
      test.fail();
    }
  });
});
