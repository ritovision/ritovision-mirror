export type SitemapFilter = {
  include?: (string | RegExp)[];
  exclude?: (string | RegExp)[];
  includeRoot?: boolean;
};

const assetExtRe = /\.(png|jpe?g|webp|svg|gif|ico|css|js|mjs|map|xml|txt|json|pdf|zip|gz|mp4|mp3|woff2?|ttf|otf|eot|wasm)(?:$|\?)/i;

function toRegExp(p: string | RegExp): RegExp {
  return typeof p === 'string' ? new RegExp(p) : p;
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export async function getSitemapUrls(baseURL: string, sitemapPath: string = '/sitemap.xml'): Promise<string[]> {
  const sitemapUrl = new URL(sitemapPath, baseURL).toString();
  const xml = await fetchText(sitemapUrl);
  const locs = extractLocs(xml);

  if (/<\s*sitemapindex[\s>]/i.test(xml)) {
    const children = await Promise.all(locs.map(async (loc) => extractLocs(await fetchText(loc))));
    return uniq(children.flat());
  }
  return uniq(locs);
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  return await res.text();
}

function extractLocs(xml: string): string[] {
  const re = /<\s*loc[^>]*>([\s\S]*?)<\/\s*loc\s*>/gi;
  const out: string[] = [];
  let m;
  while ((m = re.exec(xml)) !== null) {
    const val = m[1]?.trim();
    if (val) out.push(val);
  }
  return out;
}

export function urlsToRoutePaths(urls: string[], baseURL: string, filter: SitemapFilter = {}): string[] {
  const base = new URL(baseURL);
  const include = (filter.include ?? []).map(toRegExp);
  const exclude = (filter.exclude ?? []).map(toRegExp);
  const includeRoot = filter.includeRoot ?? true;

  const paths = urls
    .map(u => {
      try {
        const abs = new URL(u, base);
        return abs.pathname;
      } catch {
        try {
          const abs = new URL(String(u), base);
          return abs.pathname;
        } catch {
          return null;
        }
      }
    })
    .filter((p): p is string => !!p)
    .filter(p => !p.startsWith('/api'))
    .filter(p => !assetExtRe.test(p))
    .map(p => (p.endsWith('/') ? (p === '/' ? '/' : p.slice(0, -1)) : p));

  const filtered = paths.filter(p => {
    const includeOK = include.length ? include.some(r => r.test(p)) : true;
    const excludeOK = exclude.length ? !exclude.some(r => r.test(p)) : true;
    return includeOK && excludeOK;
  });

  const final = uniq(filtered);
  if (includeRoot && !final.includes('/')) final.unshift('/');
  return final;
}
