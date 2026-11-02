import { createTheme } from '@mui/material/styles';
import { color, fontFamily, radius, shadow } from './tokens';

export const theme = createTheme({
  // 4 px spacing base: theme.spacing(6) === 24px
  spacing: 4,
  shape: { borderRadius: radius.sm },
  palette: {
    primary: { main: color.blue600, dark: color.blue700, light: color.blue50, contrastText: color.neutral0 },
    success: { main: color.green800, light: color.green50 },
    warning: { main: color.orange800, light: color.orange50 },
    info: { main: color.blue600, light: color.blue50 },
    text: { primary: color.neutral800, secondary: color.neutral500 },
    background: { default: color.neutral50, paper: color.neutral0 },
    divider: color.neutral200,
  },
  typography: {
    fontFamily,
    // 32 / Title · 20 / Heading · 14 / Body
    h1: { fontSize: 32, fontWeight: 700, lineHeight: 1.25 },
    h2: { fontSize: 20, fontWeight: 500, lineHeight: 1.5 },
    h3: { fontSize: 16, fontWeight: 500, lineHeight: 1.5 },
    body1: { fontSize: 14, lineHeight: 1.5 },
    body2: { fontSize: 12, lineHeight: 1.5 },
    overline: { fontSize: 12, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0, textTransform: 'none' },
    button: { fontSize: 14, fontWeight: 500, lineHeight: 1.5, textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: color.neutral50 } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { height: 40, paddingInline: 16, gap: 8, borderRadius: radius.sm },
        startIcon: { margin: 0 },
        contained: { boxShadow: shadow.button, '&:hover': { boxShadow: shadow.button } },
        outlined: { borderColor: color.blue600, backgroundColor: color.neutral0 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: 40,
          fontSize: 14,
          borderRadius: radius.sm,
          backgroundColor: color.neutral0,
          paddingLeft: 12,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: color.neutral200 },
        },
        input: { padding: '0 12px 0 0', '&::placeholder': { color: color.neutral500, opacity: 1 } },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: { borderColor: color.neutral200, borderRadius: radius.md, boxShadow: shadow.card },
      },
    },
  },
});
