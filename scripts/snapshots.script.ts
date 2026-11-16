import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "@playwright/test";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.SNAPSHOT_URL ?? "http://localhost:5173";
const OUT = process.env.SNAPSHOT_DIR ?? join(ROOT, "test-results", "snapshots");
const OG = join(ROOT, "public", "og", "og-cover.png");

interface Shot {
  readonly name: string;
  readonly section: string;
  readonly offset: number;
}

const SHOTS: readonly Shot[] = [
  { name: "hero", section: "top", offset: 0 },
  { name: "about", section: "about", offset: 0 },
  { name: "cast", section: "cast", offset: 0.35 },
  { name: "cast-more", section: "cast", offset: 1.1 },
  { name: "projects", section: "projects", offset: 0.25 },
  { name: "projects-more", section: "projects", offset: 1.3 },
  { name: "path", section: "path", offset: 0.3 },
  { name: "contact", section: "contact", offset: 0 },
];

async function open(page: Page, url: string, settle: number): Promise<void> {
  await page.goto(url);
  await page.locator("#page-loader").waitFor({ state: "detached", timeout: 30_000 });
  await page.waitForTimeout(settle);
}

async function scrollTo(page: Page, section: string, offset: number): Promise<void> {
  await page.evaluate(
    ([id, factor]) => {
      const element = document.getElementById(String(id));
      if (element === null) {
        return;
      }
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + Number(factor) * window.innerHeight);
    },
    [section, offset] as const,
  );
  await page.waitForTimeout(2200);
}

async function capture(page: Page, prefix: string): Promise<void> {
  for (const shot of SHOTS) {
    await scrollTo(page, shot.section, shot.offset);
    await page.screenshot({ path: join(OUT, `${prefix}-${shot.name}.png`) });
  }
}

await mkdir(OUT, { recursive: true });
await mkdir(dirname(OG), { recursive: true });
const browser = await chromium.launch({ channel: "msedge", args: ["--ignore-gpu-blocklist", "--enable-gpu-rasterization"] });

const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, locale: "pt-BR" });
await open(og, `${BASE}/`, 3600);
await og.screenshot({ path: OG });
await og.close();

const desktop = await browser.newPage({ viewport: { width: 1600, height: 900 }, locale: "pt-BR" });
await open(desktop, `${BASE}/`, 3000);
await capture(desktop, "desktop");
await desktop.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "pt-BR" });
await open(mobile, `${BASE}/`, 3000);
await capture(mobile, "mobile");
await mobile.close();

await browser.close();
console.log(`snapshots em ${OUT}, og em ${OG}`);
