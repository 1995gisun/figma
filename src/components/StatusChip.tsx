import Chip from '@mui/material/Chip';
import { color, radius } from '../theme/tokens';

export type ProjectStatus = 'In progress' | 'In review' | 'Completed';

const tones: Record<ProjectStatus, { fg: string; bg: string }> = {
  'In progress': { fg: color.blue600, bg: color.blue50 },
  'In review': { fg: color.orange800, bg: color.orange50 },
  Completed: { fg: color.green800, bg: color.green50 },
};

// DS/StatusChip — 104 × 24 px · semantic foreground and tint
export function StatusChip({ status }: { status: ProjectStatus }) {
  const { fg, bg } = tones[status];
  return (
    <Chip
      label={status}
      sx={{
        width: 104,
        height: 24,
        borderRadius: `${radius.lg}px`,
        bgcolor: bg,
        color: fg,
        fontSize: 12,
        fontWeight: 500,
        '& .MuiChip-label': { px: 3 },
      }}
    />
  );
}
