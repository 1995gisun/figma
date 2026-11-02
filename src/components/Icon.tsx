import Box from '@mui/material/Box';
import { cssVar } from '../theme/tokens';
import bell from '../assets/icons/bell.svg';
import calendarDays from '../assets/icons/calendar-days.svg';
import chartNoAxesCombined from '../assets/icons/chart-no-axes-combined.svg';
import chevronDown from '../assets/icons/chevron-down.svg';
import chevronLeft from '../assets/icons/chevron-left.svg';
import chevronRight from '../assets/icons/chevron-right.svg';
import circleCheck from '../assets/icons/circle-check.svg';
import component from '../assets/icons/component.svg';
import download from '../assets/icons/download.svg';
import folderOpen from '../assets/icons/folder-open.svg';
import layers from '../assets/icons/layers.svg';
import layoutDashboard from '../assets/icons/layout-dashboard.svg';
import monitor from '../assets/icons/monitor.svg';
import navFolderOpen from '../assets/icons/nav-folder-open.svg';
import panelsTopLeft from '../assets/icons/panels-top-left.svg';
import plus from '../assets/icons/plus.svg';
import search from '../assets/icons/search.svg';
import settings from '../assets/icons/settings.svg';
import smartphone from '../assets/icons/smartphone.svg';
import users from '../assets/icons/users.svg';

// The SVGs are exported from Figma with a stroke colour baked in. They are drawn as a CSS mask,
// so only their shape is used and the colour comes from the icon tokens of the active mode.
const icons = {
  bell,
  'calendar-days': calendarDays,
  'chart-no-axes-combined': chartNoAxesCombined,
  'chevron-down': chevronDown,
  'chevron-left': chevronLeft,
  'chevron-right': chevronRight,
  'circle-check': circleCheck,
  component,
  download,
  'folder-open': folderOpen,
  layers,
  'layout-dashboard': layoutDashboard,
  monitor,
  'nav-folder-open': navFolderOpen,
  'panels-top-left': panelsTopLeft,
  plus,
  search,
  settings,
  smartphone,
  users,
} as const;

export type IconName = keyof typeof icons;

const toneColor = {
  brand: cssVar('color.icon.brand'), // baked #1976D2
  secondary: cssVar('color.icon.secondary'), // baked #64748B
  'on-action': cssVar('color.icon.on-action'), // baked white
} as const;
export type IconTone = keyof typeof toneColor;

const defaultTone: Record<IconName, IconTone> = {
  bell: 'secondary',
  'calendar-days': 'brand',
  'chart-no-axes-combined': 'secondary',
  'chevron-down': 'secondary',
  'chevron-left': 'secondary',
  'chevron-right': 'secondary',
  'circle-check': 'brand',
  component: 'brand',
  download: 'brand',
  'folder-open': 'brand',
  layers: 'brand',
  'layout-dashboard': 'brand',
  monitor: 'brand',
  'nav-folder-open': 'secondary',
  'panels-top-left': 'brand',
  plus: 'on-action',
  search: 'secondary',
  settings: 'secondary',
  smartphone: 'brand',
  users: 'secondary',
};

/** `tone` defaults to the colour the icon had in Figma; `color` overrides it with any CSS colour. */
export function Icon({ name, size = 20, tone, color }: { name: IconName; size?: number; tone?: IconTone; color?: string }) {
  const mask = `url("${icons[name]}") center / contain no-repeat`;
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: size,
        height: size,
        display: 'block',
        flexShrink: 0,
        bgcolor: color ?? toneColor[tone ?? defaultTone[name]],
        mask,
        WebkitMask: mask,
      }}
    />
  );
}
