// tokens/tokens.json(Tokens Studio 내보내기) → CSS 변수 + MUI 테마용 JSON
//
//   npm run tokens          한 번 빌드
//   npm run dev / storybook  vite.config.ts 의 tokensPlugin 이 시작할 때 빌드하고,
//                            tokens.json 이 바뀌면 다시 빌드해서 화면을 갱신합니다.
//
// Tokens Studio 파일은 세트(core, light, Workspace · …)로 나뉘어 있고 {color.blue.600} 처럼
// 세트 이름 없이 서로 참조하며 수식도 쓰기 때문에, 세트를 합친 뒤
// @tokens-studio/sd-transforms 로 참조·수식을 풀어 Style Dictionary 에 넘깁니다.
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

// Figma 의 number 변수(간격, 모서리, 크기, 글자 크기)는 단위가 없으므로 CSS 에서만 px 를 붙입니다.
// MUI 테마용 JSON 에는 숫자 그대로 둡니다.
StyleDictionary.registerTransform({
  name: 'workspace/number-px',
  type: 'value',
  filter: (token) => (token.$type ?? token.type) === 'number',
  transform: (token) => `${token.$value ?? token.value}px`,
});

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const TOKENS_FILE = path.join(root, 'tokens', 'tokens.json');
const OUT_DIR = 'src/theme/generated/';

// 모드마다 Global(원시값) → Semantic(역할별 값) → Components(컴포넌트별 값) 세트를 합쳐 빌드합니다.
// 같은 이름의 CSS 변수를 모드별 선택자에 다시 정의하므로, data-theme 속성만 바꾸면 화면 전체가 바뀝니다.
// core / light / dark / theme 세트는 Tokens Studio 기본 예제이고, Primitives/Light 는 Global 과 같은 값이라 제외했습니다.
const MODES = [
  { name: 'light', set: 'Light', selector: ':root, [data-theme="light"]' },
  { name: 'dark', set: 'Dark', selector: '[data-theme="dark"]' },
  { name: 'senior', set: 'Senior', selector: '[data-theme="senior"]' },
];
const BUILDS = MODES.map((mode) => ({
  ...mode,
  sets: ['Global', 'Semantic', 'Components'].map((layer) => `Workspace · ${layer}/${mode.set}`),
}));

const isToken = (node) => node && typeof node === 'object' && '$value' in node;

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    const both = value && typeof value === 'object' && !isToken(value) && target[key] && typeof target[key] === 'object';
    target[key] = both ? deepMerge(target[key], value) : structuredClone(value);
  }
  return target;
}

// 뒤 세트가 앞 세트 값을 조용히 덮어쓰지 않도록, 서로 다른 세트에 같은 토큰 경로가 있으면 멈춥니다.
function findCollisions(sets) {
  const seen = new Set();
  const collisions = [];
  const walk = (node, prefix) => {
    for (const [key, value] of Object.entries(node)) {
      const name = prefix ? `${prefix}.${key}` : key;
      if (isToken(value)) {
        if (seen.has(name)) collisions.push(name);
        else seen.add(name);
      } else if (value && typeof value === 'object') walk(value, name);
    }
  };
  // 한 세트 안에서는 JSON 키가 겹칠 수 없으므로, 여기서 잡히는 것은 세트 사이의 충돌입니다.
  for (const set of sets) walk(set, '');
  return collisions;
}

export async function buildTokens({ log = console.log } = {}) {
  const file = JSON.parse(await readFile(TOKENS_FILE, 'utf8'));
  await mkdir(path.join(root, OUT_DIR), { recursive: true });

  for (const build of BUILDS) {
    const missing = build.sets.filter((set) => !file[set]);
    if (missing.length) throw new Error(`tokens.json 에 세트가 없습니다: ${missing.join(', ')}`);
    const tokens = build.sets.reduce((acc, set) => deepMerge(acc, file[set]), {});
    const collisions = findCollisions(build.sets.map((set) => file[set]));
    if (collisions.length) throw new Error(`세트끼리 같은 토큰 이름이 겹칩니다: ${collisions.slice(0, 5).join(', ')}`);

    const sd = new StyleDictionary({
      tokens,
      preprocessors: ['tokens-studio'],
      log: { verbosity: 'silent', warnings: 'disabled' },
      platforms: {
        css: {
          transformGroup: 'tokens-studio',
          transforms: ['name/kebab', 'workspace/number-px'],
          buildPath: path.join(root, OUT_DIR),
          files: [
            {
              destination: `${build.name}.css`,
              format: 'css/variables',
              options: { selector: build.selector, outputReferences: true },
            },
          ],
        },
        json: {
          transformGroup: 'tokens-studio',
          buildPath: path.join(root, OUT_DIR),
          files: [{ destination: `${build.name}.json`, format: 'json/nested' }],
        },
      },
    });
    await sd.buildAllPlatforms();
    log(`✓ tokens (${build.name}) → ${OUT_DIR}${build.name}.css, ${build.name}.json`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildTokens().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
