import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { WdsButton } from './WdsButton';

const meta = {
  title: 'WDS/Button',
  component: WdsButton,
  args: { label: '확인', variant: 'primary', size: 'large' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline'] },
    size: { control: 'inline-radio', options: ['large', 'medium'] },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof WdsButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Figma 컴포넌트 세트와 같은 배열: variant × size 행, state 열.
export const AllStates: Story = {
  render: () => {
    const variants = ['primary', 'secondary', 'outline'] as const;
    const sizes = ['large', 'medium'] as const;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, auto)', gap: 16, alignItems: 'center', fontFamily: 'monospace', fontSize: 12 }}>
        <span />
        {['default', 'pressed', 'disabled', 'loading'].map((s) => <span key={s}>{s}</span>)}
        {variants.flatMap((v) =>
          sizes.map((sz) => (
            <div key={`${v}-${sz}`} style={{ display: 'contents' }}>
              <span>{v} / {sz}</span>
              <WdsButton variant={v} size={sz} label="확인" />
              <WdsButton variant={v} size={sz} label="확인" forceState="pressed" />
              <WdsButton variant={v} size={sz} label="확인" disabled />
              <WdsButton variant={v} size={sz} label="확인" loading />
            </div>
          )),
        )}
      </div>
    );
  },
};

// 시연용: Figma 색 변경 → Tokens Studio Push → GitHub → (storybook:sync 가 받아옴) → 이 버튼 색이 바뀝니다.
// 현재 CSS 변수 값과 마지막으로 바뀐 시각을 화면에 표시해서, 반영 시간을 그대로 측정할 수 있게 합니다.
function useCssVar(name: string) {
  const read = () => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [state, setState] = useState(() => ({ value: read(), changedAt: null as Date | null }));
  useEffect(() => {
    const id = setInterval(() => {
      const value = read();
      setState((prev) => (prev.value === value ? prev : { value, changedAt: new Date() }));
    }, 250);
    return () => clearInterval(id);
  }, [name]);
  return state;
}

function SyncDemo() {
  const bg = useCssVar('--wds-button-primary-bg');
  const primary = useCssVar('--wds-color-primary-normal');
  const time = (d: Date | null) => (d ? d.toLocaleTimeString('ko-KR', { hour12: false }) : '—');
  return (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 'var(--wds-spacing-gap-lg)', fontFamily: 'Pretendard, sans-serif' }}>
      <WdsButton label="즉시결제" block />
      <div
        style={{
          padding: 'var(--wds-spacing-inset-card)',
          borderRadius: 'var(--wds-radius-card)',
          background: 'var(--wds-color-background-elevated-normal)',
          border: '1px solid var(--wds-color-line-normal-neutral)',
          color: 'var(--wds-color-label-normal)',
          fontSize: 'var(--wds-font-size-label-1)',
          lineHeight: 'var(--wds-line-height-label-1)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '6px 12px',
        }}
      >
        <span style={{ color: 'var(--wds-color-label-alternative)' }}>button/primary/bg</span>
        <code data-testid="button-bg">{bg.value}</code>
        <span style={{ color: 'var(--wds-color-label-alternative)' }}>color/primary/normal</span>
        <code>{primary.value}</code>
        <span style={{ color: 'var(--wds-color-label-alternative)' }}>마지막 변경</span>
        <code data-testid="changed-at">{time(bg.changedAt)}</code>
        <span style={{ color: 'var(--wds-color-label-alternative)' }}>출처</span>
        <code>design-system/tokens.json</code>
      </div>
    </div>
  );
}

export const TokenSync: Story = {
  name: 'Token sync (Figma → Git)',
  render: () => <SyncDemo />,
};
