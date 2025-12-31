import { test, expect } from "@playwright/test";

test.describe("Guesser Game", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render the initial UI message with random prompt", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", {
        name: /Guess the number/i,
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Guess an integer between 1 and/i,
      })
    ).toBeVisible();
  });

  test("should congrats on a successful guess", async ({ page }) => {
    await page.getByTestId("guessInputEl").click();
    await page.getByTestId("guessInputEl").fill("3");
    await page.getByTestId("submitBtn").click();
    await expect(
      page.getByRole("heading", {
        name: /Congratulations! Great guess ✅ The random number was 3/i,
      })
    ).toBeVisible();
    await expect(page.getByTestId("successImg")).toBeVisible();
    await expect(page.getByTestId("guessInputEl")).toBeDisabled();
    await expect(page.getByTestId("tryAgainBtn")).toBeVisible();
  });

  test("should display the failure message & try again btn", async ({
    page,
  }) => {
    await page.getByTestId("guessInputEl").click();
    await page.getByTestId("guessInputEl").fill("2");
    await page.getByTestId("submitBtn").click();
    await expect(
      page.getByRole("heading", {
        name: /Wrong guess ❌. The random number was 3/i,
      })
    ).toBeVisible();
    await expect(page.getByTestId("failureImg")).toBeVisible();
    await expect(page.getByTestId("guessInputEl")).toBeDisabled();
    await expect(page.getByTestId("tryAgainBtn")).toBeVisible();
  });

  test("should reset the UI on tryAgainBtn click", async ({ page }) => {
    await page.getByTestId("guessInputEl").click();
    await page.getByTestId("guessInputEl").fill("1");
    await page.getByTestId("submitBtn").click();
    await page.getByTestId("tryAgainBtn").click();
    await expect(
      page.getByRole("heading", {
        name: /Guess an integer between 1 and /i,
      })
    ).toBeVisible();
    await expect(page.getByTestId("playImg")).toBeVisible();
    await expect(page.getByTestId("guessInputEl")).toBeEnabled();
    await expect(page.getByTestId("submitBtn")).toBeVisible();
  });
});
