export type Preset = 'default' | 'chinese' | 'japanese' | 'binary';

// Default symbol set: Katakana, numbers, uppercase, lowercase
function getDefaultSymbols(): string[] {
  const symbols: string[] = [];
  for (let i = 0x30a0; i <= 0x30ff; i++) symbols.push(String.fromCharCode(i));
  for (let i = 0x0030; i <= 0x0039; i++) symbols.push(String.fromCharCode(i));
  for (let i = 0x0041; i <= 0x005a; i++) symbols.push(String.fromCharCode(i));
  for (let i = 0x0061; i <= 0x007a; i++) symbols.push(String.fromCharCode(i));
  return symbols;
}

// Chinese preset: CJK Unified Ideographs (subset)
function getChineseSymbols(): string[] {
  const arr: string[] = [];
  for (let i = 0x4e00; i <= 0x4e5f; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

// Japanese preset: Hiragana + Katakana
function getJapaneseSymbols(): string[] {
  const arr: string[] = [];
  for (let i = 0x3040; i <= 0x309f; i++) {
    arr.push(String.fromCharCode(i));
  }
  for (let i = 0x30a0; i <= 0x30ff; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

// Binary preset: 0 and 1
function getBinarySymbols(): string[] {
  return ['0', '1'];
}

// Export a master presets map
export const SYMBOL_PRESETS: Record<Preset, string[]> = {
  default: getDefaultSymbols(),
  chinese: getChineseSymbols(),
  japanese: getJapaneseSymbols(),
  binary: getBinarySymbols(),
};

/**
 * Retrieve the symbol array for a given preset. Falls back to 'default'.
 */
export function getPresetSymbols(preset: Preset): string[] {
  return SYMBOL_PRESETS[preset] || SYMBOL_PRESETS.default;
}
