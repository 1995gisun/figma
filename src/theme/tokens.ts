// Mirrors the Figma "MUI Workspace" variables (Global → Semantic → Components, Light / Dark / Senior).
// Values come from tokens/tokens.json via scripts/build-tokens.mjs (Style Dictionary) —
// edit the JSON, not this file.
import dark from './generated/dark.json';
import light from './generated/light.json';
import senior from './generated/senior.json';

export type ThemeMode = 'light' | 'dark' | 'senior';
export type ModeTokens = typeof light;

export const modeTokens: Record<ThemeMode, ModeTokens> = { light, dark, senior };

// "chip.info.size.status-width" | "color.text.primary" | … — renamed tokens fail the type check.
type Leaves<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string | number ? `${P}${K}` : Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];
export type TokenPath = Leaves<ModeTokens>;

/**
 * CSS variable for a token, e.g. cssVar('chip.info.size.status-width') → 'var(--chip-info-size-status-width)'.
 * The value follows the active mode (data-theme on <html>), so prefer this in `sx` for anything mode-dependent.
 */
export function cssVar(path: TokenPath): string {
  return `var(--${path.replace(/\./g, '-')})`;
}

// Global primitives — identical in every mode. Kept for the Foundations specimen page.
const { color: c, radius: r, font } = light;

export const color = {
  blue600: c.blue['600'],
  blue700: c.blue['700'],
  blue50: c.blue['50'],
  neutral0: c.neutral['0'],
  neutral50: c.neutral['50'],
  neutral200: c.neutral['200'],
  neutral500: c.neutral['500'],
  neutral800: c.neutral['800'],
  green800: c.green['800'],
  green50: c.green['50'],
  orange800: c.orange['800'],
  orange50: c.orange['50'],
} as const;

export const radius = { sm: r['4'], md: r['8'], lg: r['12'] } as const;

// Not in tokens.json yet — kept local.
export const shadow = {
  card: '0px 2px 4px 0px rgba(31,41,55,0.03)',
  button: '0px 2px 4px 0px rgba(31,41,55,0.12)',
} as const;

export const fontFamily = `${font.family.default}, "Helvetica Neue", Arial, sans-serif`;
