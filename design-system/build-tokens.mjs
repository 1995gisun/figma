// design-system/tokens.json (Figma "AI system test" 파일 → Tokens Studio 무료 버전 단일 파일 동기화)
//   → src/theme/generated/wds/{light,dark,senior}.css
//
//   npm run tokens:wds        한 번 빌드
//   npm run storybook / dev   vite.config.ts 의 wdsTokens 플러그인이 시작할 때 빌드하고,
//                             tokens.json 이 바뀌면 다시 빌드합니다(HMR).
//
// Tokens Studio 무료 버전은 테마가 없으므로, Figma 컬렉션/모드 이름 그대로인 세트를 모드별로 합칩니다.
//   Light  = Global/Value + Semantic/Light  + Component/Value
//   Dark   = Global/Value + Semantic/Dark   + Component/Value
//   Senior = Global/Value + Semantic/Senior + Component/Value
// 기존 tokens/tokens.json(MUI Workspace) 빌드와 섞이지 않도록 CSS 변수에 --wds- 접두사를 붙이고,
// Global(기초) 토큰은 출력하지 않습니다 — 화면·컴포넌트는 Semantic/Component 만 씁니다.
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

// Figma number 변수는 단위가 없으므로 px 를 붙입니다. 굵기(font-weight)는 숫자 그대로 둡니다.
StyleDictionary.registerTransform({
  name: 'wds/number-px',
  type: 'value',
  filter: (token) => (token.$type ?? token.type) === 'number' && token.path[0] !== 'font-weight',
  transform: (token) => `${token.$value ?? token.value}px`,
});

const here = path.dirname(fileURLToPath(import.meta.url));
export const WDS_TOKENS_FILE = path.join(here, 'tokens.json');
const OUT_DIR = path.join(here, '..', 'src', 'theme', 'generated', 'wds');

const GLOBAL = 'Global/Value';
const MODES = [
  { name: 'light', set: 'Semantic/Light', selector: ':root, [data-theme="light"]' },
  { name: 'dark', set: 'Semantic/Dark', selector: '[data-theme="dark"]' },
  { name: 'senior', set: 'Semantic/Senior', selector: '[data-theme="senior"]' },
];
const COMPONENT = 'Component/Value';

const isToken = (node) => node && typeof node === 'object' && '$value' in node;

function collect(node, prefix = '', out = []) {
  for (const [key, value] of Object.entries(node)) {
    const name = prefix ? `${prefix}.${key}` : key;
    if (isToken(value)) out.push(name);
    else if (value && typeof value === 'object') collect(value, name, out);
  }
  return out;
}

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    const both = value && typeof value === 'object' && !isToken(value) && target[key] && typeof target[key] === 'object';
    target[key] = both ? deepMerge(target[key], value) : structuredClone(value);
  }
  return target;
}

export async function buildWdsTokens({ log = console.log } = {}) {
  const file = JSON.parse(await readFile(WDS_TOKENS_FILE, 'utf8'));
  await mkdir(OUT_DIR, { recursive: true });
  const globalNames = new Set(collect(file[GLOBAL] ?? {}));

  for (const mode of MODES) {
    const sets = [GLOBAL, mode.set, COMPONENT];
    const missing = sets.filter((s) => !file[s]);
    if (missing.length) throw new Error(`design-system/tokens.json 에 세트가 없습니다: ${missing.join(', ')}`);

    // 세트끼리 같은 토큰 이름이 있으면 뒤 세트가 조용히 덮어쓰므로 멈춥니다.
    const seen = new Set();
    const collisions = sets.flatMap((s) => collect(file[s])).filter((n) => (seen.has(n) ? true : (seen.add(n), false)));
    if (collisions.length) throw new Error(`세트끼리 같은 토큰 이름이 겹칩니다: ${collisions.slice(0, 5).join(', ')}`);

    const tokens = sets.reduce((acc, s) => deepMerge(acc, file[s]), {});
    const sd = new StyleDictionary({
      tokens,
      preprocessors: ['tokens-studio'],
      log: { verbosity: 'silent', warnings: 'disabled', errors: { brokenReferences: 'throw' } },
      platforms: {
        css: {
          transformGroup: 'tokens-studio',
          transforms: ['name/kebab', 'wds/number-px'],
          prefix: 'wds',
          buildPath: OUT_DIR + path.sep,
          files: [{
            destination: `${mode.name}.css`,
            format: 'css/variables',
            filter: (token) => !globalNames.has(token.path.join('.')),
            options: { selector: mode.selector },
          }],
        },
      },
    });
    await sd.buildAllPlatforms();
    log(`✓ wds tokens (${mode.name}) → src/theme/generated/wds/${mode.name}.css`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildWdsTokens().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
