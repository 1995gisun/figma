// 토큰 JSON → 테마별 CSS 변수 (3단계 파이프라인 출발점, 1단계 JSON 검증용)
// 실행: npm i -D style-dictionary@4 @tokens-studio/sd-transforms@1 && node build-tokens.mjs
import fs from 'node:fs';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

const themes = JSON.parse(fs.readFileSync('tokens/$themes.json', 'utf8'));

for (const theme of themes) {
  const sets = Object.entries(theme.selectedTokenSets);
  const include = sets.filter(([, s]) => s === 'source').map(([n]) => `tokens/${n}.json`);
  const source = sets.filter(([, s]) => s === 'enabled').map(([n]) => `tokens/${n}.json`);
  const selector = theme.id === 'light' ? ':root, [data-theme="light"]' : `[data-theme="${theme.id}"]`;

  const sd = new StyleDictionary({
    include,
    source,
    preprocessors: ['tokens-studio'],
    log: { errors: { brokenReferences: 'throw' } },
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: 'build/css/',
        files: [{
          destination: `tokens.${theme.id}.css`,
          format: 'css/variables',
          filter: (token) => token.isSource, // Global(기초) 토큰은 출력하지 않음
          options: { selector },
        }],
      },
    },
  });
  await sd.buildAllPlatforms();
}
