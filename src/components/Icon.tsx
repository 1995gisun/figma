import Box from '@mui/material/Box';
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

// Each SVG is exported from Figma with its stroke colour baked in,
// so brand (blue) and neutral (slate) variants are separate files.
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

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <Box
      component="img"
      src={icons[name]}
      alt=""
      aria-hidden
      sx={{ width: size, height: size, display: 'block', flexShrink: 0 }}
    />
  );
}
