import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Icon } from './Icon';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  width?: number;
};

// DS/TextField — 240 × 40 px · leading icon · placeholder
export function SearchField({ value, onChange, placeholder = 'Search projects', width = 240 }: Props) {
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
