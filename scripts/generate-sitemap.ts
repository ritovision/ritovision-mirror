import fs from "fs";
import path from "path";
import { glob } from "glob";

const SITE_URL = process.env.BASE_URL || "https://ritovision.com";
const OUTPUT_FILE = path.resolve("public/sitemap.xml");
const APP_DIR = path.resolve("app");
const PUBLIC_DIR = path.resolve("public");
const EXCLUDE_PATTERNS = ["/admin/*", "/drafts/*", "/styles/*", "/test-errors"];

async function main() {
  const appPages = await glob("**/page.{js,jsx,ts,tsx}", { cwd: APP_DIR });
  const normalized = appPages.map((p) => p.replace(/\\/g, "/"));
  const appPagesFiltered = normalized.filter(
    (p) =>
      !p.startsWith("styles/") &&
      !/\/\[.+?\]\//.test(`/${p}/`) &&
      !/\/\(.+?\)\//.test(`/${p}/`)
  );
  const routes = appPagesFiltered.map(toRoute).filter((r) => !isExcluded(r));
  const imageFiles = await glob("**/*.{png,jpg,jpeg,webp,avif,gif,svg}", { cwd: PUBLIC_DIR });
  const imageUrls = imageFiles
    .map((f) => `${SITE_URL}/${f.replace(/\\/g, "/")}`)
    .filter((u) => !u.endsWith("/sitemap.xml"));
  const urls = Array.from(new Set([...routes.map((r) => `${SITE_URL}${r}`), ...imageUrls]));
  const xml = buildXml(urls);
  fs.writeFileSync(OUTPUT_FILE, xml);
}

function toRoute(filePath: string): string {
  let route = filePath;
  // Remove page.{ext} from root or subdirectories
  route = route.replace(/^page\.[^/]+$/, ""); // Handle root page.tsx → ""
  route = route.replace(/\/page\.[^/]+$/, ""); // Handle nested/page.tsx → /nested
  route = "/" + route;
  route = route.replace(/\/index$/, "");
  route = route.replace(/\/\([^/]+\)/g, "");
  if (route === "/") return route;
  return route.replace(/\/$/, "");
}

function isExcluded(route: string): boolean {
  return EXCLUDE_PATTERNS.some((pattern) => {
    const regex = new RegExp("^" + pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$");
    return regex.test(route);
  });
}

function buildXml(urls: string[]): string {
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
