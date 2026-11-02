import { createTheme, type Theme } from '@mui/material/styles';
import { modeTokens, shadow, type ThemeMode } from './tokens';

// One MUI theme per Figma mode, built from the Semantic tokens of that mode.
// Light reproduces the original hand-written values (40 px controls, 14 px body, 4 px radius …).
export function createWorkspaceTheme(mode: ThemeMode): Theme {
  const t = modeTokens[mode];
  const { color, typography: type, space, shape, size } = t;
  const fontFamily = `${type['font-family']}, "Helvetica Neue", Arial, sans-serif`;
  const lh = (lineHeight: number, fontSize: number) => `${lineHeight / fontSize}`;

  return createTheme({
    // 4 px spacing base: theme.spacing(6) === 24px
    spacing: 4,
    shape: { borderRadius: shape.control },
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      primary: {
        main: color.action['primary-background'],
        dark: color.text['brand-strong'],
        light: color.surface['brand-subtle'],
        contrastText: color.text['on-action'],
      },
      success: { main: color.status.success.foreground, light: color.status.success.background },
      warning: { main: color.status.warning.foreground, light: color.status.warning.background },
      info: { main: color.status.info.foreground, light: color.status.info.background },
      error: { main: color.status.error.foreground, light: color.status.error.background },
      text: { primary: color.text.primary, secondary: color.text.secondary },
      background: { default: color.background.canvas, paper: color.surface.default },
      divider: color.border.divider,
    },
    typography: {
      fontFamily,
      // Display / Heading · Subtitle / Body / Caption
      h1: { fontSize: type.display['font-size'], fontWeight: 700, lineHeight: lh(type.display['line-height-40'], type.display['font-size']) },
      h2: { fontSize: type.heading['font-size'], fontWeight: 500, lineHeight: lh(type.heading['line-height-30'], type.heading['font-size']) },
      h3: { fontSize: type.subtitle['font-size'], fontWeight: 500, lineHeight: lh(type.subtitle['line-height-24'], type.subtitle['font-size']) },
      body1: { fontSize: type.body['font-size'], lineHeight: lh(type.body['line-height-21'], type.body['font-size']) },
      body2: { fontSize: type.caption['font-size'], lineHeight: lh(type.caption['line-height-18'], type.caption['font-size']) },
      overline: {
        fontSize: type.caption['font-size'],
        fontWeight: 500,
        lineHeight: lh(type.caption['line-height-18'], type.caption['font-size']),
        letterSpacing: 0,
        textTransform: 'none',
      },
      button: { fontSize: type.body['font-size'], fontWeight: 500, lineHeight: lh(type.body['line-height-21'], type.body['font-size']), textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: { body: { backgroundColor: color.background.canvas } },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            height: size['control-height'],
            paddingInline: space['control-inline'],
            gap: space.xs,
            borderRadius: shape.control,
          },
          startIcon: { margin: 0 },
          contained: { boxShadow: shadow.button, '&:hover': { boxShadow: shadow.button } },
          outlined: {
            borderColor: color.border.interactive,
            backgroundColor: color.action['secondary-background'],
            color: color.action['secondary-foreground'],
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: size['control-height'],
            fontSize: type.body['font-size'],
            borderRadius: shape.control,
            backgroundColor: color.input.background,
            paddingLeft: space['input-inline'],
            '& .MuiOutlinedInput-notchedOutline': { borderColor: color.border.default },
          },
          input: {
            padding: `0 ${space['input-inline']}px 0 0`,
            '&::placeholder': { color: color.text.placeholder, opacity: 1 },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          outlined: { borderColor: color.border.default, borderRadius: shape.surface, boxShadow: shadow.card },
        },
      },
    },
  });
}

export const themes: Record<ThemeMode, Theme> = {
  light: createWorkspaceTheme('light'),
  dark: createWorkspaceTheme('dark'),
  senior: createWorkspaceTheme('senior'),
};

export const theme = themes.light;
