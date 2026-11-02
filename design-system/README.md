# Design System Tokens (PoC)

Figma Variables(공개 오픈소스 디자인 시스템 색상 기반 가상 브랜드)를 내보낸 토큰과 빌드 스크립트입니다.

| 경로 | 내용 |
|---|---|
| `tokens/global.json` | 기초 토큰 122개 (색상·간격·모서리·글자 크기·줄 높이·굵기·크기) |
| `tokens/semantic/{light,dark,senior}.json` | 의미 토큰 81개 × 3개 모드 |
| `tokens/component.json` | 컴포넌트 토큰 77개 (button, input, list-item, tab, bottom-sheet) |
| `tokens/$themes.json`, `$metadata.json` | Tokens Studio 테마·세트 순서 |
| `docs/token-naming-rules.md` | 이름 규칙 |
| `build-tokens.mjs` | Style Dictionary로 테마별 CSS 변수 생성 |

```bash
cd design-system
npm install
npm run build:tokens   # → build/css/tokens.{light,dark,senior}.css
```

Figma 원본과 이 JSON의 값 442개는 해시 대조로 일치를 확인했습니다.
