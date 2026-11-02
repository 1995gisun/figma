# Design System Tokens (PoC)

Figma "AI system test" 파일의 Variables(공개 오픈소스 디자인 시스템 색상 기반 가상 브랜드)를 Tokens Studio로 동기화하는 토큰과 빌드 스크립트입니다.

| 경로 | 내용 |
|---|---|
| `tokens.json` | Tokens Studio 단일 파일. 세트 이름 = Figma `컬렉션/모드` |
| `build-tokens.mjs` | Style Dictionary → `src/theme/generated/wds/{light,dark,senior}.css` (`--wds-*`) |
| `docs/token-naming-rules.md` | 이름 규칙 |

## 세트 구성

| 세트 | 토큰 수 | 내용 |
|---|---|---|
| `Global/Value` | 136 | 기초 값(색상·간격·모서리·글자 크기·줄 높이·굵기·크기). CSS로 출력하지 않음 |
| `Semantic/Light` · `Semantic/Dark` · `Semantic/Senior` | 각 97 | 의미 토큰. 전부 Global 참조 |
| `Component/Value` | 135 | button, input, list-item, tab, bottom-sheet + icon, top-app-bar, feed-item, banner, shortcut-tile, illustration, tab-bar. 전부 Semantic 참조 |

모드별 CSS = `Global/Value` + `Semantic/{모드}` + `Component/Value`.

## Tokens Studio 연결 (무료 버전)

무료 버전은 테마와 폴더 동기화를 쓸 수 없어서 단일 파일로 동기화합니다.

- Sync provider: GitHub · Repository `1995gisun/figma` · Branch `sua/design-system` · File path `design-system/tokens.json`
- 처음 연결할 때는 **Pull**. 이후 Figma 변수를 바꾸면 Styles & Variables → Import variables(스타일 체크 해제) → **Push**
- 플러그인 안에서 모드 확인은 `Semantic/Light`·`Dark`·`Senior` 중 하나만 체크해서 봅니다. 실제 모드 전환은 Figma 변수 모드와 스토리북 툴바에서 합니다.

## 빌드

```bash
npm run tokens:wds        # 한 번 빌드
npm run storybook         # 시작 시 빌드, tokens.json 저장 시 자동 재빌드
npm run storybook:sync    # 위 + GitHub 원격 브랜치를 5초마다 확인해 토큰 변경을 자동으로 받아옴
```

## Figma → 스토리북 동기화 시연

1. `npm run storybook:sync` 실행 → 스토리북 **WDS / Button / Token sync (Figma → Git)** 열기
2. Figma에서 변수 변경(예: `Global` → `color/blue/50`)
3. Tokens Studio → Styles & Variables → Import variables(**Styles 체크 해제**) → Push
4. 몇 초 안에 버튼 색과 값이 바뀌고 "마지막 변경" 시각이 찍힘 → 토큰 반영 시간 측정에 사용

로컬에 커밋하지 않은 변경이 있으면 받아오지 않고 경고만 남깁니다(작업을 덮어쓰지 않음).
