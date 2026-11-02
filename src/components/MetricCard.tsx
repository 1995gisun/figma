import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type Props = {
  label: string;
  value: string;
  supportingText: string;
  icon: ReactNode;
  /** Positive trends render in success green; neutral context in secondary text. */
  tone?: 'success' | 'neutral';
};

// DS/MetricCard — editable Label, Value, Supporting text and Icon slot
export function MetricCard({ label, value, supportingText, icon, tone = 'success' }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{ height: 152, p: 6, display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 0 }}
    >
      <Box sx={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
        {icon}
      </Box>
      <Typography sx={{ fontSize: 32, fontWeight: 700, lineHeight: '40px' }}>{value}</Typography>
      <Typography
        variant="body1"
        sx={{ lineHeight: '20px' }}
        color={tone === 'success' ? 'success.main' : 'text.secondary'}
      >
        {supportingText}
      </Typography>
    </Paper>
  );
}
