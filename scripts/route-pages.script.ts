import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { registerHooks } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const DIST = join(ROOT, "dist");
const ORIGIN = (process.env.SITE_URL ?? "https://wilker-portfolio.pages.dev").replace(/\/+$/, "");
const OG_IMAGE = `${ORIGIN}/og/og-cover.png`;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      return nextResolve(pathToFileURL(join(SRC, `${specifier.slice(2)}.ts`)).href, context);
    }
    return nextResolve(specifier, context);
  },
});

const { buildRouteMetas } = await import("../src/data/seo/route-meta.builder.ts");
const { HTML_LANG, OG_LOCALE } = await import("../src/shared/i18n/locale-routes.constants.ts");

type RouteMeta = ReturnType<typeof buildRouteMetas>[number];

function escapeAttribute(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function absolute(path: string): string {
  return path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path.replace(/\/+$/, "")}/`;
}

function headFor(meta: RouteMeta): string {
  const title = escapeAttribute(meta.title);
  const description = escapeAttribute(meta.description);
  const alternates = Object.entries(meta.alternates)
    .map(([locale, path]) => `<link rel="alternate" hreflang="${locale}" href="${absolute(path)}" />`)
    .join("\n    ");
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${absolute(meta.path)}" />`,
    alternates,
    `<link rel="alternate" hreflang="x-default" href="${absolute("/")}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Wilker Lima" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${absolute(meta.path)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[meta.locale]}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ].join("\n    ");
}

function render(template: string, lang: string, head: string): string {
  return template.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`).replace(/<title>[\s\S]*?<\/title>/, head);
}

function preloadTags(files: readonly string[]): string[] {
  const fonts = files.filter((file) => /^(mona-sans-latin-standard-normal|monaspace-neon-latin-400-normal)-.*\.woff2$/.test(file));
  const fetches = files.filter((file) => file.endsWith(".glb") || /^monaspace-neon-latin-600-normal-.*\.woff$/.test(file));
  return [
    ...fonts.map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`),
    ...fetches.map((file) => `<link rel="preload" href="/assets/${file}" as="fetch" crossorigin />`),
  ];
}

function outputFile(path: string): string {
  return path === "/" ? join(DIST, "index.html") : join(DIST, ...path.split("/").filter(Boolean), "index.html");
}

function sitemap(metas: readonly RouteMeta[]): string {
  const entries = metas
    .map((meta) => {
      const links = Object.entries(meta.alternates)
        .map(([locale, path]) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${absolute(path)}" />`)
        .join("\n");
      return `  <url>\n    <loc>${absolute(meta.path)}</loc>\n${links}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
}

const preloads = preloadTags(await readdir(join(DIST, "assets")));
const source = await readFile(join(DIST, "index.html"), "utf8");
const template = source.replace('<meta charset="UTF-8" />', ['<meta charset="UTF-8" />', ...preloads].join("\n    "));
const metas = buildRouteMetas();

for (const meta of metas) {
  const file = outputFile(meta.path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, render(template, HTML_LANG[meta.locale], headFor(meta)));
}

const notFoundHead = `<title>404 · Wilker Lima</title>\n    <meta name="robots" content="noindex" />`;
await writeFile(join(DIST, "404.html"), render(template, "pt-BR", notFoundHead));
await writeFile(join(DIST, "sitemap.xml"), sitemap(metas));
await writeFile(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

console.log(`route pages: ${metas.length} rotas, ${preloads.length} preloads, origem ${ORIGIN}`);
