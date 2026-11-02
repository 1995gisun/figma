import Button, { type ButtonProps } from '@mui/material/Button';
import { Icon } from './Icon';

type DsButtonProps = Omit<ButtonProps, 'variant' | 'startIcon'> & { label: string };

// DS/ButtonPrimary — 40 px height · label-driven width · 4 px radius
export function ButtonPrimary({ label, ...rest }: DsButtonProps) {
  return (
    <Button variant="contained" startIcon={<Icon name="plus" size={18} />} {...rest}>
      {label}
    </Button>
  );
}

// DS/ButtonOutlined
export function ButtonOutlined({ label, ...rest }: DsButtonProps) {
  return (
    <Button variant="outlined" startIcon={<Icon name="download" size={18} />} {...rest}>
      {label}
    </Button>
  );
}
