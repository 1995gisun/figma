# 디자인 토큰 이름 규칙

Figma Variables, `tokens/*.json`, CSS 변수가 **같은 이름**을 쓰도록 하는 규칙입니다. 이름이 같아야 Figma에서 바꾼 값이 사람 손 없이 코드까지 이어집니다.

## 1. 3단 구조

| 층 | Figma 컬렉션 | 파일 | 모드 | 누가 쓰나 | 예 |
|---|---|---|---|---|---|
| 기초(Global) | `Global` | `tokens/global.json` | 1개(Value) | **아무도 직접 쓰지 않음** — Semantic이 참조만 함 | `color/blue/50`, `spacing/16`, `font-size/16` |
| 의미(Semantic) | `Semantic` | `tokens/semantic/{light,dark,senior}.json` | Light · Dark · Senior | 화면(페이지) 조립 | `color/primary/normal`, `spacing/gap-md`, `font-size/body-1` |
| 컴포넌트(Component) | `Component` | `tokens/component.json` | 1개(Value) | 컴포넌트 5종 내부 | `button/primary/bg`, `input/border-error` |

- 참조 방향은 **Component → Semantic → Global** 한 방향만 허용합니다. 거꾸로 참조하거나 층을 건너뛰지 않습니다.
- 값(HEX, px)은 **Global에만** 있습니다. Semantic과 Component는 전부 별칭(alias)입니다.
- 모드는 Semantic에만 있습니다. Component 토큰은 Semantic을 참조하므로 모드를 따라 자동으로 바뀝니다.

## 2. 이름 형식

```
{분류}/{역할}/{변형}        소문자, 단어 연결은 하이픈(-), 계층은 슬래시(/)
```

| 위치 | 표기 | 예 |
|---|---|---|
| Figma 변수 | 슬래시 | `color/label/alternative` |
| JSON 참조 | 점 | `{color.label.alternative}` |
| CSS 변수 (Figma Dev Mode code syntax와 동일) | 하이픈 | `var(--color-label-alternative)` |
| iOS code syntax(참고용) | camelCase | `Color.wds.labelAlternative` |

### 분류(첫 단어)

| 분류 | 타입 | Global 이름 | Semantic 이름 |
|---|---|---|---|
| `color` | 색상 | `color/{팔레트}/{명도}`, 반투명은 `color/alpha/{팔레트}-{명도}-{불투명도%}` | `color/{primary·label·background·line·fill·status·interaction·inverse·static·material}/…` |
| `spacing` | 간격 | `spacing/{px}` | `spacing/inset-{screen·card·control}`, `spacing/gap-{xs·sm·md·lg·xl}` |
| `radius` | 모서리 | `radius/{px}`, `radius/full` | `radius/{sm·control·card·sheet·pill}` |
| `size` | 높이·크기 | `size/{px}` | `size/control-{lg·md·sm}`, `size/list-item`, `size/avatar`, `size/icon-{md·lg}` |
| `font-size` · `line-height` | 글자 크기·줄 높이 | `font-size/{px}` | `font-size/{title-2 … caption-1}` (11단계 타입 램프) |
| `font-weight` | 굵기 | `font-weight/{400·500·600·700}` (숫자) | `font-weight/{regular·medium·semibold·bold}` (역할) |

- Global은 **값 그대로**(`spacing/16`), Semantic은 **용도**(`spacing/gap-lg`)로 짓습니다. 같은 이름이 두 층에 동시에 있으면 JSON이 자기 자신을 참조하므로 금지합니다(그래서 Global 굵기는 숫자 이름).
- 상태 접미사는 `-pressed`, `-focused`, `-selected`, `-disabled`, `-error` 만 씁니다.

### Component 토큰

```
{컴포넌트}/{variant}/{속성}[-상태]      예) button/primary/bg-pressed, tab/segment/label-selected
{컴포넌트}/{속성}[-크기]                예) button/height-large, input/padding-x
```

컴포넌트 이름은 `button`, `input`, `list-item`, `tab`, `bottom-sheet` 5개입니다.

## 3. 모드 규칙

| 모드 | 무엇이 바뀌나 |
|---|---|
| Light | 기준값 |
| Dark | 색상만 바뀜 |
| Senior (큰 글씨) | 색은 Light 기준에 대비를 강화(보조 글자색 한 단계 진하게)하고, 글자 크기 +3~4px, 굵기 한 단계 굵게, 컨트롤 높이 +8px, 카드·컨트롤 안쪽 여백 +4px |

코드에서는 `<html data-theme="light|dark|senior">`로 전환합니다(`build-tokens.mjs`가 테마별 CSS를 만듭니다).

## 4. 컴포넌트 변형 이름 = 코드 속성 이름

Figma 컴포넌트 속성 이름과 값은 Vue 컴포넌트 prop과 같게 맞춥니다.

| Figma 컴포넌트 | Figma 속성 | Vue 사용 예 |
|---|---|---|
| `Button` | `variant=primary·secondary·outline`, `size=large·medium`, `state=default·pressed·disabled·loading`, `label` | `<WdsButton variant="primary" size="large" :disabled :loading>` |
| `TextField` | `state=default·focused·filled·error·disabled`, `label`, `helperText`, `showHelper` | `<WdsTextField v-model label helper-text :error :disabled>` |
| `ListItem` | `trailing=chevron·value·none`, `state=default·pressed·disabled`, `title`, `description`, `showLeading`, `showDescription` | `<WdsListItem title description trailing="value">` |
| `TabItem` / `Tabs` | `variant=line·segment`, `state=default·pressed·selected·disabled`, `label` | `<WdsTabs v-model variant="segment"><WdsTab value>` |
| `BottomSheet` | `actions=single·double`, `title`, `description` | `<WdsBottomSheet v-model:open title>` + `#default`, `#actions` 슬롯 |

`state`는 Figma에서 화면을 그리기 위한 속성입니다. 코드에서는 `pressed`=`:active`, `focused`=`:focus-within`, `selected`=v-model 값 일치, `disabled`·`loading`·`error`=boolean prop으로 대응합니다.

## 5. 금지 패턴

- 색·간격·모서리·크기를 숫자나 HEX로 직접 쓰기 (예: `color: #0066FF`, `padding: 16px`)
- 컴포넌트 안에서 Semantic이나 Global 토큰을 직접 쓰기 → 해당 컴포넌트 토큰을 추가해서 쓴다
- 화면에서 Global 토큰 쓰기 → Semantic을 쓴다
- 새 이름 체계 만들기(`primaryColor`, `blue-primary` 등)

## 6. 토큰 추가 절차

1. 필요한 값이 Global에 있는지 확인하고, 없으면 Global에 값을 추가한다.
2. Semantic(3개 모드 모두) 또는 Component에 별칭을 추가한다. scope(쓸 수 있는 속성)와 code syntax(`var(--이름)`)를 반드시 지정한다.
3. JSON을 내보내 PR을 올리고, 검증자 승인 후 병합한다.
