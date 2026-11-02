# mui-system

Figma **MUI Workspace** 디자인을 React + MUI로 구현한 디자인 시스템입니다.
디자인 토큰은 Figma(Tokens Studio)에서 내보낸 `tokens/tokens.json` 하나에서 시작하고, 컴포넌트는 Storybook에서 확인합니다.

코드 작성 규칙(토큰 사용, 컴포넌트 재사용, prop 이름, 금지 패턴)은 [AGENTS.md](AGENTS.md)에 있습니다.

## 시작하기

```bash
npm install          # 처음 한 번, 그리고 pull 후 package.json이 바뀌었을 때마다
npm run storybook    # http://localhost:6006
```

## 명령어

| 명령어 | 하는 일 |
|---|---|
| `npm run storybook` | Storybook 개발 서버 (포트 6006). 시작할 때 토큰을 빌드하고, `tokens.json`이 바뀌면 다시 빌드합니다 |
| `npm run dev` | 앱 개발 서버 (Vite). 토큰 처리는 위와 같습니다 |
| `npm run tokens` | `tokens/tokens.json` → `src/theme/generated/*`를 한 번만 빌드 |
| `npm run build` | 토큰 빌드 → 타입 체크(`tsc -b`) → 앱 빌드(`dist/`) |
| `npm run build-storybook` | 정적 Storybook 빌드(`storybook-static/`) |
| `npm run preview` | 빌드한 앱 미리보기 |
| `npx vitest run --project storybook` | 모든 스토리를 헤드리스 Chromium에서 렌더링해 테스트 (a11y 검사 포함) |

## 전체 흐름

```
Figma 변수 (MUI Workspace: Global → Semantic → Components, Light / Dark / Senior)
   │  Tokens Studio 플러그인으로 내보내기 (tokens 브랜치 → PR)
   ▼
tokens/tokens.json
   │  scripts/build-tokens.mjs (Style Dictionary + @tokens-studio/sd-transforms)
   ▼
src/theme/generated/{light,dark,senior}.css   CSS 변수 (--color-text-primary …)
src/theme/generated/{light,dark,senior}.json  MUI 테마용 값
   │
   ▼
src/theme/tokens.ts   모드별 토큰, cssVar() 헬퍼, TokenPath 타입
src/theme/theme.ts    모드마다 MUI 테마 생성 (createWorkspaceTheme)
   │
   ▼
src/components/*  →  src/pages/*  →  앱 / Storybook
```

## 폴더 구조

```
tokens/tokens.json          Figma에서 내보낸 원본 토큰 (직접 수정하지 말고 Figma에서 바꾸기)
scripts/build-tokens.mjs    토큰 빌드 스크립트
src/
  theme/
    generated/              빌드 결과물. 직접 수정하지 말 것
    tokens.ts               토큰 접근 (cssVar, modeTokens, TokenPath)
    theme.ts                MUI 테마 (Light / Dark / Senior)
    Tokens.stories.tsx      Foundations/Tokens 스토리
  components/               디자인 시스템 컴포넌트 + 각 *.stories.tsx
  pages/                    Figma 화면 단위 페이지 + Pages.stories.tsx
  assets/icons/             Figma에서 내보낸 SVG 아이콘
  stories/                  Storybook 기본 예제 (Example/*). 필요 없으면 삭제해도 됨
.storybook/
  main.ts                   스토리 경로, 애드온 설정
  preview.tsx               테마 Provider, 토큰 CSS, Mode 툴바
vite.config.ts              Vite + 토큰 자동 빌드 플러그인 + Vitest(Storybook) 설정
```

## Figma

- 파일: [Figma 디자인 파일](https://www.figma.com/design/QHLks7Ced3wbXTzSeJhjah/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1)
- 앱의 두 화면이 Figma 프레임과 1:1로 대응합니다.
  - `/#/`: Workspace · Project overview ([ProjectOverview.tsx](src/pages/ProjectOverview.tsx))
  - `/#/components`: MUI · Components ([ComponentLibrary.tsx](src/pages/ComponentLibrary.tsx))
- 각 컴포넌트 위 주석에 대응하는 Figma 컴포넌트 이름(`DS/ButtonPrimary`, `DS/StatusChip` 등)이 적혀 있습니다. 크기, 색상, radius는 가능한 한 `Components` 세트의 토큰(`chip/*`, `metric-card/*`, `project-row/*`, `input/*`)에서 가져옵니다.

### tokens.json의 세트

| 세트 | 용도 |
|---|---|
| `Workspace · Global/*` | 원시값 (색상 팔레트, 간격, radius, 폰트) |
| `Workspace · Semantic/*` | 역할별 값 (`color.text.primary`, `color.status.success.*` 등) |
| `Workspace · Components/*` | 컴포넌트별 값 (`chip.info.size.status-width` 등) |
| `core`, `light`, `dark`, `theme` | Tokens Studio 기본 예제. **빌드에서 제외됨** |
| `Workspace · Primitives/Light` | Global과 같은 값이라 **빌드에서 제외됨** |

각 모드(Light / Dark / Senior)는 Global → Semantic → Components 순서로 합쳐 빌드합니다. 서로 다른 세트에 같은 토큰 이름이 있으면 빌드가 실패합니다.

### 토큰을 바꾸려면

1. Figma에서 변수를 수정하고 Tokens Studio로 내보냅니다.
2. `tokens/tokens.json`이 바뀌면 `npm run storybook` / `npm run dev`가 실행 중일 때 자동으로 다시 빌드되어 화면에 반영됩니다. 서버가 꺼져 있으면 `npm run tokens`를 실행하세요.
3. 토큰 이름이 바뀌었다면 `npx tsc --noEmit`으로 확인하세요. `cssVar()`에 없는 경로를 넣으면 타입 에러가 납니다.

> `shadow`(card, button)는 아직 `tokens.json`에 없어서 [tokens.ts](src/theme/tokens.ts)에 직접 적혀 있습니다.

## Storybook

사이드바 구성:

| 그룹 | 내용 |
|---|---|
| Foundations/Tokens | 현재 모드의 토큰 목록 (All / Colors / Chip) |
| Design System/* | Buttons, MetricCard, ProjectRow, SearchField, StatusChip |
| Pages | Overview(Project overview), Components(MUI · Components) 전체 화면 |
| Example/* | Storybook 기본 예제 |

- 상단 툴바의 **Mode**에서 Light / Dark / Senior를 바꿀 수 있습니다. `<html data-theme>`(CSS 변수)와 MUI 테마가 함께 바뀝니다.
- Storybook은 `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`와 `src/**/*.mdx` 파일만 보여줍니다. **스토리 파일이 없는 컴포넌트는 사이드바에 나오지 않습니다.**
- 애드온: Docs, A11y, Vitest, Chromatic, MCP

### 컴포넌트를 추가하려면

1. `src/components/MyComponent.tsx`를 만듭니다. 색상과 크기는 하드코딩하지 말고 테마(`'primary.main'`, `theme.spacing`)나 `cssVar('…')`를 씁니다.
2. 옆에 `MyComponent.stories.tsx`를 만들고 `title: 'Design System/MyComponent'`로 지정합니다.
3. 모드마다 화면이 맞는지 Mode 툴바로 확인합니다.

## 문제 해결

| 증상 | 해결 |
|---|---|
| `Cannot find package 'style-dictionary'` 같은 `ERR_MODULE_NOT_FOUND` | pull 후 `npm install`을 하지 않은 경우입니다. `npm install`을 실행하세요 |
| `EADDRINUSE: address already in use :6006` | 이전 Storybook이 아직 실행 중입니다. 그 터미널을 종료하거나 node 프로세스를 정리하세요 |
| `tokens.json 빌드 실패 — 이전 결과를 유지합니다` | JSON 문법 오류, 세트 누락, 세트 간 토큰 이름 충돌 중 하나입니다. 메시지에 원인이 나옵니다 |
| 컴포넌트가 Storybook에 안 보임 | 해당 `*.stories.tsx` 파일이 있는지 확인하세요 |
| `src/theme/generated/*`가 계속 modified로 표시됨 | 줄바꿈(LF/CRLF) 차이일 수 있습니다. `git diff --ignore-cr-at-eol`로 실제 변경이 없으면 무시해도 됩니다 |
