import type { ButtonHTMLAttributes } from 'react';
import './WdsButton.css';

// Figma "Components / Button": variant=primary·secondary·outline, size=large·medium,
// state=default·pressed·disabled·loading. state 는 코드에서 :active / disabled / loading 으로 표현합니다.
export type WdsButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'large' | 'medium';
  loading?: boolean;
  block?: boolean;
  /** Figma 상태를 그대로 보여주기 위한 값(스토리용). 실제 화면에서는 쓰지 않습니다. */
  forceState?: 'pressed';
};

export function WdsButton({
  label,
  variant = 'primary',
  size = 'large',
  loading = false,
  block = false,
  forceState,
  disabled,
  className,
  ...rest
}: WdsButtonProps) {
  const classes = ['wds-button', `wds-button--${variant}`, `wds-button--${size}`, block && 'wds-button--block', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      data-state={forceState}
      {...rest}
    >
      {loading && <span className="wds-button__spinner" aria-hidden="true" />}
      {label}
    </button>
  );
}
