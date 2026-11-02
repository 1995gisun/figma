/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { buildTokens, TOKENS_FILE } from './scripts/build-tokens.mjs';
import { buildWdsTokens, WDS_TOKENS_FILE } from './design-system/build-tokens.mjs';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// tokens/tokens.json → src/theme/generated/* (Style Dictionary).
// Runs on start of `npm run dev` / `npm run storybook` / builds, and again whenever the JSON is saved;
// the regenerated CSS/JSON then reach the browser through normal Vite HMR.
function designTokens(): Plugin {
  return {
    name: 'design-tokens',
    async buildStart() {
      await buildTokens({ log: () => {} });
    },
    configureServer(server) {
      const logger = server.config.logger;
      let timer: ReturnType<typeof setTimeout> | undefined;
      server.watcher.add(TOKENS_FILE);
      server.watcher.on('change', (file) => {
        if (path.resolve(file) !== TOKENS_FILE) return;
        clearTimeout(timer);
        timer = setTimeout(async () => {
          try {
            await buildTokens({ log: (msg: string) => logger.info(msg, { timestamp: true }) });
          } catch (err) {
            // Keep the last good output so the page stays usable while the JSON is being fixed.
            const message = `tokens.json 빌드 실패 — 이전 결과를 유지합니다\n${(err as Error).message}`;
            logger.error(message, { timestamp: true });
            // Only overlay pages that are open now; Vite would otherwise replay this error
            // to the next page that connects, even after the JSON has been fixed.
            if (server.ws.clients.size) server.ws.send({ type: 'error', err: { message, stack: '' } });
          }
        }, 100);
      });
    },
  };
}

// design-system/tokens.json (Figma "AI system test" → Tokens Studio single-file sync) → src/theme/generated/wds/*.css.
// Same pattern as designTokens(): build on start, rebuild when the JSON is saved
// (e.g. after `npm run storybook:sync` pulls a Tokens Studio push), then Vite HMR updates the CSS.
function wdsTokens(): Plugin {
  return {
    name: 'wds-design-tokens',
    async buildStart() {
      await buildWdsTokens({ log: () => {} });
    },
    configureServer(server) {
      const logger = server.config.logger;
      let timer: ReturnType<typeof setTimeout> | undefined;
      server.watcher.add(WDS_TOKENS_FILE);
      const onChange = (file: string) => {
        if (path.resolve(file) !== WDS_TOKENS_FILE) return;
        clearTimeout(timer);
        timer = setTimeout(async () => {
          try {
            await buildWdsTokens({ log: (msg: string) => logger.info(msg, { timestamp: true }) });
          } catch (err) {
            const message = `design-system/tokens.json 빌드 실패 — 이전 결과를 유지합니다\n${(err as Error).message}`;
            logger.error(message, { timestamp: true });
            if (server.ws.clients.size) server.ws.send({ type: 'error', err: { message, stack: '' } });
          }
        }, 100);
      };
      server.watcher.on('change', onChange);
      server.watcher.on('add', onChange);
    },
  };
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), designTokens(), wdsTokens()],
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});