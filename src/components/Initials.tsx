import Avatar from '@mui/material/Avatar';
import { radius } from '../theme/tokens';

// Avatar used in sidebar, top bar and activity feed: brand tint, rounded-square 12 px
export function Initials({ text, size = 32 }: { text: string; size?: number }) {
  return (
    <Avatar
      variant="rounded"
      sx={{
        width: size,
        height: size,
        borderRadius: `${radius.lg}px`,
        bgcolor: 'primary.light',
        color: 'primary.main',
        fontSize: size >= 36 ? 14 : 12,
        fontWeight: 500,
      }}
    >
      {text}
    </Avatar>
  );
}
