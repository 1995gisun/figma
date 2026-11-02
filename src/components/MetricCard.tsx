import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { cssVar } from '../theme/tokens';

type Props = {
  label: string;
  value: string;
  supportingText: string;
  icon: ReactNode;
  /** Positive trends render in success green; neutral context in secondary text. */
  tone?: 'success' | 'neutral';
};

// DS/MetricCard — editable Label, Value, Supporting text and Icon slot; sizes from metric-card/* tokens
export function MetricCard({ label, value, supportingText, icon, tone = 'success' }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: cssVar('metric-card.size.metric-height'),
        p: cssVar('metric-card.space.card-inset'),
        gap: cssVar('metric-card.space.card-stack'),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
      }}
    >
      <Box sx={{ height: cssVar('metric-card.size.metric-heading-height'), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: cssVar('metric-card.typography.display.font-size'),
          lineHeight: cssVar('metric-card.typography.display.line-height-40'),
          fontWeight: 700,
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: cssVar('metric-card.typography.body.line-height-20') }}
        color={tone === 'success' ? 'success.main' : 'text.secondary'}
      >
        {supportingText}
      </Typography>
    </Paper>
  );
}
