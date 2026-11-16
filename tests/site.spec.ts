import { expect, test, type Page } from "@playwright/test";

test.use({ locale: "pt-BR" });

const IGNORED_ERRORS = [/WebGL/i, /GPU stall/i, /THREE\.WebGLRenderer/i];

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !IGNORED_ERRORS.some((pattern) => pattern.test(message.text()))) {
      errors.push(message.text());
    }
  });
  return errors;
}

test("home in Portuguese loads and shows the name", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await expect(page).toHaveTitle(/Wilker Lima/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Wilker Lima");
  await expect(page.locator("canvas")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  expect(errors).toEqual([]);
});

test("home in English uses the English copy", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Software engineer");
});

test("case studies render in both languages", async ({ page }) => {
  await page.goto("/projetos/codebuild");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("go-codebuild-tool");
  await page.goto("/en/projects/expertidict");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ExpertiDict");
});

test("every section is reachable from the header", async ({ page }) => {
  await page.goto("/");
  for (const id of ["about", "cast", "projects", "path", "contact"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("the mobile menu opens and leads to a section", async ({ page, isMobile }) => {
  test.skip(!isMobile, "menu is mobile only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Abrir menu" });
  await toggle.click();
  await expect(page.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
  await page.locator("#site-menu").getByRole("link", { name: "projetos" }).click();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
});

test("clicking the name in the header goes back to the top", async ({ page }) => {
  await page.goto("/");
  await page.locator("#page-loader").waitFor({ state: "detached", timeout: 30_000 });
  await page.evaluate(() => window.scrollTo(0, 2400));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
  await page.locator("header").getByRole("link", { name: /Wilker Lima/ }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 8000 }).toBeLessThan(5);
});

test("unknown routes show the not found page", async ({ page }) => {
  await page.goto("/rota-que-nao-existe");
  await expect(page.getByText("Essa página não existe.")).toBeVisible();
});

test("reduced motion still shows the opening text", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", locale: "pt-BR" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByText("Backend em Go", { exact: false }).first()).toBeVisible();
  await context.close();
});

test("the page never scrolls sideways", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1500);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
