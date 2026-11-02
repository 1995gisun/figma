import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { cssVar } from '../theme/tokens';
import { Icon } from './Icon';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  width?: number | string;
};

// DS/TextField — input/default tokens (240 × 40 px in Light) · leading icon · placeholder
export function SearchField({ value, onChange, placeholder = 'Search projects', width = cssVar('input.default.size.input-width') }: Props) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      sx={{ width }}
      slotProps={{
        htmlInput: { 'aria-label': placeholder },
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 2 }}>
              <Icon name="search" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
