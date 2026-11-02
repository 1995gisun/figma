# AGENTS.md: 코드 작성 규칙

이 문서는 이 저장소에서 코드를 작성하는 AI 코딩 도구와 사람 모두를 위한 규칙입니다. 프로젝트 구조와 명령어는 [README.md](README.md)를 보세요.

규칙은 **새로 작성하거나 수정하는 코드**에 적용합니다. 기존 코드 중 규칙에 맞지 않는 부분은 아래 [알려진 예외](#알려진-예외)에 적어 두었으니 따라 하지 마세요.

---

## 1. 색상과 간격은 토큰 변수만 사용한다

모든 색상, 간격, 크기, radius, 글자 크기는 `tokens/tokens.json`에서 생성된 토큰을 통해서만 지정합니다. 값을 직접 쓰지 않습니다.

### 허용하는 방법

| 방법 | 예시 | 언제 |
|---|---|---|
| `cssVar('<토큰 경로>')` | `cssVar('color.text.secondary')`, `cssVar('space.md')` | **기본.** 모드(Light / Dark / Senior)에 따라 바뀌는 값 |
| 컴포넌트 토큰 | `cssVar('metric-card.space.card-inset')` | 해당 컴포넌트 토큰이 있을 때 (일반 토큰보다 우선) |
| MUI 팔레트 키 | `color="text.secondary"`, `bgcolor: 'background.paper'` | MUI가 테마에서 색을 읽는 prop. 팔레트는 토큰으로 만들어집니다 |
| MUI typography variant | `<Typography variant="body1">` | 글자 크기와 줄 높이 |

- `cssVar()`는 [src/theme/tokens.ts](src/theme/tokens.ts)에 있습니다. 존재하지 않는 경로를 넣으면 타입 에러가 납니다.
- 사용할 수 있는 토큰은 [src/theme/generated/light.json](src/theme/generated/light.json)에서 보거나, Storybook의 **Foundations/Tokens**에서 확인합니다.
- 간격 토큰: `space.xxs`(4) · `xs`(8) · `sm`(12) · `md`(16) · `lg`(24) · `xl`(32) · `2xl`(40), 그리고 `control-inline`, `input-inline`, `card-inset`, `card-stack`
- 색상은 원시값(`color.blue.600`)이 아니라 **역할 이름**(`color.text.brand`, `color.status.success.foreground`)을 씁니다.

### 필요한 토큰이 없을 때

값을 직접 쓰지 말고 **작업을 멈추고 알립니다.** 토큰은 Figma에서 추가한 뒤 `tokens.json`으로 내보내야 합니다. `tokens.json`이나 `src/theme/generated/*`를 직접 수정해서 토큰을 만들지 않습니다.

```tsx
// ✅
sx={{ p: cssVar('space.lg'), color: cssVar('color.text.secondary'), borderRadius: cssVar('shape.control') }}

// ❌ 값을 직접 씀
sx={{ p: '24px', color: '#64748B', borderRadius: 4 }}

// ❌ MUI spacing 숫자 (토큰과 연결되지 않음)
sx={{ p: 6, gap: 3 }}
```

---

## 2. 새 컴포넌트를 만들지 말고 기존 5개를 재사용한다

디자인 시스템 컴포넌트는 아래 5개입니다. 화면을 만들 때는 이것들을 조합하고, 비슷한 컴포넌트를 새로 만들지 않습니다.

| 컴포넌트 | 파일 | 용도 |
|---|---|---|
| `ButtonPrimary`, `ButtonOutlined` | [Buttons.tsx](src/components/Buttons.tsx) | 모든 텍스트 버튼. 주요 동작은 Primary, 보조 동작은 Outlined |
| `MetricCard` | [MetricCard.tsx](src/components/MetricCard.tsx) | 숫자 지표 카드 (label, value, supportingText, icon) |
| `ProjectRow`, `ProjectTableHeader` | [ProjectTable.tsx](src/components/ProjectTable.tsx) | 프로젝트 목록 표 |
| `SearchField` | [SearchField.tsx](src/components/SearchField.tsx) | 검색 입력 |
| `StatusChip` | [StatusChip.tsx](src/components/StatusChip.tsx) | 프로젝트 상태 표시 |

보조 요소: [`Icon`](src/components/Icon.tsx)(아이콘은 반드시 이것으로), [`Initials`](src/components/Initials.tsx)(사용자 이니셜 아바타)

### 규칙

- **버튼을 새로 만들지 않습니다.** `ButtonPrimary` / `ButtonOutlined`를 쓰고, 동작은 `onClick`, `disabled` 등 MUI `Button` props로 넘깁니다.
- 페이지에서 MUI의 `Button`, `TextField`, `Chip`을 직접 쓰지 않습니다. 위 컴포넌트로 대체할 수 있으면 대체합니다.
- 기존 컴포넌트로 표현할 수 없는 요구가 있으면 새 컴포넌트를 만들지 말고 **먼저 알립니다.** Figma에 해당 컴포넌트가 생기면 그때 추가합니다.
- 기존 컴포넌트에 prop을 추가할 때는 Figma 컴포넌트의 속성(variant, slot)에 대응하는 것만 추가합니다.
- 새 디자인 시스템 컴포넌트를 추가하게 되면 (승인 후) 다음을 함께 지킵니다.
  - 파일 위에 `// DS/<Figma 컴포넌트 이름>` 주석
  - 같은 폴더에 `<Name>.stories.tsx`, `title: 'Design System/<Name>'`
  - Light / Dark / Senior 모드 모두에서 확인

---

## 3. 속성(prop) 이름 규칙

기존 컴포넌트가 따르는 규칙입니다. 새 prop도 같은 규칙으로 짓습니다.

| 종류 | 규칙 | 예시 |
|---|---|---|
| 표시할 텍스트 | 역할을 나타내는 명사, camelCase | `label`, `value`, `supportingText`, `placeholder`, `text` |
| 의미에 따른 색 변형 | **`tone`** (문자열 union) | `tone?: 'success' \| 'neutral'`, `tone?: 'brand' \| 'secondary' \| 'on-action'` |
| 도메인 상태 | 도메인 타입 그대로 | `status: ProjectStatus` |
| 슬롯 (다른 요소를 받는 자리) | 역할 이름, `ReactNode` 타입 | `icon: ReactNode` |
| 도메인 데이터 | 타입이 있는 객체 하나 | `project: Project` |
| 크기 | 정사각형은 `size`(px 숫자), 너비만이면 `width` | `size?: number`, `width?: number \| string` |
| 이벤트 | `on` + 동사. 이벤트 객체 대신 **값**을 넘김 | `onChange?: (value: string) => void` |
| boolean | MUI 관례를 따라 형용사, `is`/`has` 접두사 없음 | `disabled`, `fullWidth` |
| union 값 | 소문자 kebab-case, Figma 토큰 이름과 맞춤 | `'on-action'`, `'success'` |

- **`tone`과 `variant`를 구분합니다.** `tone`은 의미에 따른 색(성공, 중립, 브랜드), `variant`는 MUI의 모양(contained, outlined)입니다. 의미 색에 `color`, `type`, `kind`, `variant`를 쓰지 않습니다.
- 선택 prop에는 기본값을 구조 분해에서 줍니다. 예: `tone = 'success'`
- prop 타입은 컴포넌트 바로 위에 `type Props = { … }`로 정의하고, 의미가 명확하지 않은 prop에만 `/** */` 주석을 답니다.
- 컴포넌트 이름은 PascalCase이며 Figma 컴포넌트 이름에서 `DS/`를 뺀 것과 맞춥니다.

---

## 4. 금지 패턴

| ❌ 금지 | ✅ 대신 |
|---|---|
| hex, rgb, rgba 색상 직접 쓰기 (`'#1976D2'`) | `cssVar('color.…')` 또는 팔레트 키 |
| px 값이나 MUI spacing 숫자 (`'24px'`, `p: 6`) | `cssVar('space.…')`, 컴포넌트 토큰 |
| 원시 색 토큰을 화면에 사용 (`cssVar('color.blue.600')`) | 역할 토큰 (`color.text.brand`) |
| `color`, `radius` 같은 원시값 객체를 컴포넌트에서 import | `cssVar()`. 원시값 객체는 Foundations 견본용입니다 |
| 새 버튼, 입력, 칩 컴포넌트 만들기 | 기존 5개 재사용 (2절) |
| 페이지에서 MUI `Button`, `TextField`, `Chip` 직접 사용 | `ButtonPrimary`, `ButtonOutlined`, `SearchField`, `StatusChip` |
| `<img src={svg}>`로 아이콘 넣기, SVG 직접 import | `<Icon name="…" />` (모드에 따라 색이 바뀜) |
| `tokens/tokens.json` 직접 수정 | Figma에서 바꾸고 Tokens Studio로 내보내기 |
| `src/theme/generated/*` 직접 수정 | `npm run tokens`로 재생성 |
| `theme.ts`에 값을 직접 추가해서 토큰 우회 | 토큰을 Figma에 추가 요청 |
| 인라인 `style={{ … }}`, 별도 CSS 파일 | MUI `sx` |
| `!important` | `sx`와 테마 `styleOverrides` |
| Light 모드에서만 맞는 값 (모드마다 다른 값을 고정) | `cssVar()` (현재 모드 값을 따라감) |
| 아이콘 버튼에 `aria-label` 누락 | `aria-label` 필수. 장식용 아이콘은 `Icon`이 `aria-hidden` 처리합니다 |
| 스토리 없이 디자인 시스템 컴포넌트 추가 | `*.stories.tsx` 함께 추가 |

---

## 5. 작업 후 확인

```bash
npx tsc --noEmit                     # 타입 체크 (잘못된 토큰 경로도 여기서 잡힘)
npm run storybook                    # 화면 확인. 상단 Mode 툴바로 Light / Dark / Senior 전환
npx vitest run --project storybook   # 모든 스토리 렌더링 + a11y 검사
```

---

## 알려진 예외

아래는 규칙이 생기기 전에 작성된 코드입니다. **따라 하지 말고**, 그 파일을 수정할 일이 생기면 규칙에 맞게 고칩니다.

- 여러 컴포넌트와 페이지: MUI spacing 숫자 사용 (`p: 6`, `mr: 2` 등)
- [Initials.tsx](src/components/Initials.tsx): `radius.lg` 원시값 import, `fontSize` 숫자 직접 사용
- [ProjectOverview.tsx](src/pages/ProjectOverview.tsx): MUI `IconButton` 직접 사용, `width: 32`, `radius.sm` 원시값 사용
- [ProjectTable.tsx](src/components/ProjectTable.tsx): 열 너비 `'260px 176px 176px 188px'` 직접 사용 (Figma 고정 스펙, 아직 토큰 없음)
- `Icon size={18}` 같은 아이콘 크기 숫자 (아이콘 크기 토큰 없음)
- [tokens.ts](src/theme/tokens.ts)의 `shadow`: 아직 `tokens.json`에 없어 로컬에 정의됨
