import { expect } from "../../fixtures/pomFixtures";
import { test } from "../../fixtures/pomFixtures";
import { fakerFunctions } from "../../utils/faker";

test.describe("Register Tests", async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
  });

  test("Generate Random Name & Confirm", async ({ playPage }) => {
    await playPage.openNamePopup(); //opens up name genrator pop up window and checks for elements visible
    await playPage.generateRandomName(); //clicks on the name generator button and then waits for input field to be filled with text
    await playPage.confirmRandomName();
  });
});
