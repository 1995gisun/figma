import Chip from '@mui/material/Chip';
import { cssVar } from '../theme/tokens';

export type ProjectStatus = 'In progress' | 'In review' | 'Completed';

// Figma Components set: chip/info · chip/warning · chip/success
const tones = {
  'In progress': 'info',
  'In review': 'warning',
  Completed: 'success',
} as const satisfies Record<ProjectStatus, string>;

const statusColor = {
  info: { background: 'chip.info.color.status.info.background', foreground: 'chip.info.color.status.info.foreground' },
  warning: { background: 'chip.warning.color.status.warning.background', foreground: 'chip.warning.color.status.warning.foreground' },
  success: { background: 'chip.success.color.status.success.background', foreground: 'chip.success.color.status.success.foreground' },
} as const;

// DS/StatusChip — size, radius, type and colours from the chip/* component tokens (follow the active mode)
export function StatusChip({ status }: { status: ProjectStatus }) {
  const tone = tones[status];
  return (
    <Chip
      label={status}
      sx={{
        width: cssVar(`chip.${tone}.size.status-width`),
        height: cssVar(`chip.${tone}.size.status-height`),
        borderRadius: cssVar(`chip.${tone}.shape.status-radius`),
        bgcolor: cssVar(statusColor[tone].background),
        color: cssVar(statusColor[tone].foreground),
        fontSize: cssVar(`chip.${tone}.typography.caption.font-size`),
        lineHeight: cssVar(`chip.${tone}.typography.caption.line-height-18`),
        fontWeight: 500,
        '& .MuiChip-label': { px: cssVar(`chip.${tone}.space.sm`) },
      }}
    />
  );
}
