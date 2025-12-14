import type { Page, TestInfo, ConsoleMessage } from '@playwright/test';

export type ConsoleCaptureOpts = {
  failOn?: Array<'error' | 'warning' | 'pageerror'>;
  ignore?: Array<RegExp | string>;
  attachIfEmpty?: boolean;
  attachName?: string;
};

export type ConsoleEntry = {
  type: string;
  text: string;
  url?: string;
  line?: number;
  column?: number;
};

export type PageErrorEntry = {
  name: string;
  message: string;
  stack?: string;
};

function toRegex(pattern: RegExp | string): RegExp {
  return typeof pattern === 'string' ? new RegExp(pattern) : pattern;
}

function filterByIgnore<T extends { text?: string; message?: string }>(
  items: T[],
  ignore: Array<RegExp | string>
): T[] {
  if (!ignore.length) return items;
  const regs = ignore.map(toRegex);
  return items.filter(i => {
    const s = ('text' in i ? i.text : i.message) || '';
    return !regs.some(r => r.test(s));
  });
}

// --- env helpers for strictness toggles ---
function envFlag(name: string, defaultVal = false): boolean {
  const v = (process.env[name] ?? process.env[name.toUpperCase()]) ?? '';
  return /^(1|true|yes|on)$/i.test(String(v).trim()) ? true : defaultVal;
}

/**
 * Default fail policy from env:
 * - Always fail on 'pageerror'.
 * - If strict_mode_errors=1, also fail on console 'error'.
 * - Never fail on 'warning' by default (warnings are recorded but non-fatal).
 */
function defaultFailOnFromEnv(): Array<'error' | 'warning' | 'pageerror'> {
  const strictErrors = envFlag('strict_mode_errors', false);
  const arr: Array<'error' | 'warning' | 'pageerror'> = ['pageerror'];
  if (strictErrors) arr.push('error');
  return arr;
}

export async function withConsoleCapture<T>(
  page: Page,
  testInfo: TestInfo | undefined,
  fn: () => Promise<T>,
  opts: ConsoleCaptureOpts = {}
): Promise<{ result: T; logs: ConsoleEntry[]; pageErrors: PageErrorEntry[] }> {
  const failOn = opts.failOn ?? defaultFailOnFromEnv();
  const ignore = opts.ignore ?? [];
  const logs: ConsoleEntry[] = [];
  const pageErrors: PageErrorEntry[] = [];

  const onConsole = (msg: ConsoleMessage) => {
    const loc = msg.location();
    logs.push({
      type: msg.type(),
      text: msg.text(),
      url: loc?.url,
      line: loc?.lineNumber,
      column: loc?.columnNumber
    });
  };
  const onPageError = (err: Error) => {
    pageErrors.push({ name: err.name, message: err.message, stack: err.stack });
  };

  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  let result!: T;
  let errorThrown: unknown;
  try {
    result = await fn();
  } catch (e) {
    errorThrown = e;
  } finally {
    page.off('console', onConsole);
    page.off('pageerror', onPageError);
  }

  const filteredLogs = filterByIgnore(logs, ignore);
  const filteredPageErrors = filterByIgnore(pageErrors, ignore);

  // Attach to report
  if (testInfo && (opts.attachIfEmpty || filteredLogs.length || filteredPageErrors.length)) {
    const name = opts.attachName ?? 'console-capture';
    const summary =
      `Console messages: ${filteredLogs.length}\n` +
      `Page errors: ${filteredPageErrors.length}\n\n` +
      [
        ...filteredLogs.map(l => `[console.${l.type}] ${l.text} (${l.url ?? ''}:${l.line ?? ''}:${l.column ?? ''})`),
        ...filteredPageErrors.map(e => `[pageerror] ${e.message}\n${e.stack ?? ''}`)
      ].join('\n');

    await testInfo.attach(`${name}.txt`, {
      body: Buffer.from(summary, 'utf-8'),
      contentType: 'text/plain'
    });

    await testInfo.attach(`${name}.json`, {
      body: Buffer.from(JSON.stringify({ logs: filteredLogs, pageErrors: filteredPageErrors }, null, 2), 'utf-8'),
      contentType: 'application/json'
    });
  }

  // Fail policy
  if (!errorThrown) {
    const has = (t: 'error' | 'warning') => filteredLogs.some(l => l.type === t);
    const hasPageError = filteredPageErrors.length > 0;

    if (failOn.includes('error') && has('error')) {
      errorThrown = new Error(`Console errors detected (${filteredLogs.filter(l => l.type === 'error').length})`);
    }
    // Intentionally do NOT fail on 'warning' unless caller opts in via opts.failOn
    if (failOn.includes('warning') && has('warning')) {
      errorThrown = new Error(`Console warnings detected (${filteredLogs.filter(l => l.type === 'warning').length})`);
    }
    if (failOn.includes('pageerror') && hasPageError) {
      errorThrown = new Error(`Uncaught page errors detected (${filteredPageErrors.length})`);
    }
  }

  if (errorThrown) throw errorThrown;
  return { result, logs: filteredLogs, pageErrors: filteredPageErrors };
}
