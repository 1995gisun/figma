import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// Order matters: dark / senior override the light :root values when data-theme is set.
import '../src/theme/generated/light.css';
import '../src/theme/generated/dark.css';
import '../src/theme/generated/senior.css';
// WDS tokens (design-system/tokens, --wds-* prefix) — same data-theme selectors, so the Mode toolbar switches both.
import '../src/theme/generated/wds/light.css';
import '../src/theme/generated/wds/dark.css';
import '../src/theme/generated/wds/senior.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { Preview } from '@storybook/react-vite'
import { themes } from '../src/theme/theme';
import type { ThemeMode } from '../src/theme/tokens';

const preview: Preview = {
  // Toolbar switch for the Figma modes (Light / Dark / Senior).
  globalTypes: {
    mode: {
      description: 'Figma mode (Semantic / Components)',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'senior', title: 'Senior' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { mode: 'light' },
  // Same MUI theme as the app, built from tokens/tokens.json. data-theme switches the CSS variables,
  // ThemeProvider switches the MUI palette/typography — both come from the same mode's tokens.
  decorators: [
    (Story, context) => {
      const mode = (context.globals.mode ?? 'light') as ThemeMode;
      document.documentElement.dataset.theme = mode;
      return (
        <ThemeProvider theme={themes[mode]}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
