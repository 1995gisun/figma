import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { modeTokens, type ThemeMode } from './tokens';

// Every token generated from tokens/tokens.json, side by side for Light / Dark / Senior.
// Edit the JSON while Storybook is running and this page (and every component) updates.
const modes: ThemeMode[] = ['light', 'dark', 'senior'];

function flatten(node: object, path: string[] = []): [string, string | number][] {
  return Object.entries(node).flatMap(([key, value]) =>
    value !== null && typeof value === 'object' ? flatten(value, [...path, key]) : [[[...path, key].join('.'), value]],
  );
}

function Value({ name, value }: { name: string; value: string | number | undefined }) {
  const isColor = typeof value === 'string' && value.startsWith('#');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {isColor && <Box sx={{ width: 20, height: 20, borderRadius: 1, border: '1px solid', borderColor: 'divider', bgcolor: value }} />}
      <Typography variant="body2" sx={{ fontFamily: 'monospace' }} title={name}>
        {String(value)}
      </Typography>
    </Box>
  );
}

function TokenTable({ filter = '' }: { filter?: string }) {
  const values = Object.fromEntries(modes.map((m) => [m, Object.fromEntries(flatten(modeTokens[m]))]));
  const names = Object.keys(values.light).filter((n) => n.includes(filter));
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 2fr) repeat(3, minmax(120px, 1fr))', columnGap: 4, rowGap: 1.5 }}>
      {['CSS variable', 'Light', 'Dark', 'Senior'].map((h) => (
        <Typography key={h} variant="overline" color="text.secondary">{h}</Typography>
      ))}
      {names.map((name) => {
        const differs = modes.some((m) => values[m][name] !== values.light[name]);
        return (
          <Box key={name} sx={{ display: 'contents' }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: differs ? 700 : 400 }}>
              --{name.replace(/\./g, '-')}
            </Typography>
            {modes.map((m) => <Value key={m} name={name} value={values[m][name]} />)}
          </Box>
        );
      })}
    </Box>
  );
}

const meta = {
  title: 'Foundations/Tokens',
  component: TokenTable,
  parameters: { layout: 'padded' },
  argTypes: { filter: { control: 'text', description: '토큰 이름 검색 (예: chip, color.text)' } },
} satisfies Meta<typeof TokenTable>;
export default meta;

type Story = StoryObj<typeof meta>;

/** 모드마다 값이 다른 토큰은 굵게 표시돼요. */
export const All: Story = {};
export const Colors: Story = { args: { filter: 'color.' } };
export const Chip: Story = { args: { filter: 'chip.' } };
