import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { Initials } from '../components/Initials';
import { cssVar } from '../theme/tokens';

// Page shell shared by the Workspace screens (sidebar + topbar). Not a design system component.

export type WorkspacePage = 'Overview' | 'Projects' | 'Team' | 'Reports' | 'Settings';

const mainNav: { label: WorkspacePage; icon: IconName; href?: string }[] = [
  { label: 'Overview', icon: 'layout-dashboard', href: '#/' },
  { label: 'Projects', icon: 'nav-folder-open', href: '#/projects' },
  { label: 'Team', icon: 'users' },
  { label: 'Reports', icon: 'chart-no-axes-combined' },
];

function NavItem({ label, icon, href, active }: { label: string; icon: IconName; href?: string; active?: boolean }) {
  return (
    <ButtonBase
      component={href ? 'a' : 'button'}
      href={href}
      aria-current={active ? 'page' : undefined}
      sx={{
        width: '100%',
        height: cssVar('size.navigation-height'),
        px: cssVar('space.md'),
        gap: cssVar('space.sm'),
        justifyContent: 'flex-start',
        borderRadius: cssVar('shape.control'),
        bgcolor: active ? cssVar('color.navigation.background-active') : 'background.paper',
        '&:hover': { bgcolor: active ? cssVar('color.navigation.background-active') : 'background.default' },
      }}
    >
      <Icon name={icon} color={active ? cssVar('color.navigation.icon-active') : cssVar('color.icon.secondary')} />
      <Typography
        variant="body1"
        fontWeight={active ? 500 : 400}
        sx={{ color: active ? cssVar('color.navigation.text-active') : cssVar('color.text.secondary') }}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}

function Sidebar({ active }: { active: WorkspacePage }) {
  return (
    <Box
      component="nav"
      aria-label="Workspace"
      sx={{
        width: 216,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: `1px solid ${cssVar('color.border.divider')}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <Box
        sx={{
          height: 72,
          px: cssVar('space.lg'),
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${cssVar('color.border.divider')}`,
        }}
      >
        <Typography variant="h2" component="p" fontWeight={700}>
          Workspace
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          pt: cssVar('space.lg'),
          pb: cssVar('space.md'),
          px: cssVar('space.sm'),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.xxs') }}>
          {mainNav.map((item) => (
            <NavItem key={item.label} label={item.label} icon={item.icon} href={item.href} active={active === item.label} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.md') }}>
          <NavItem label="Settings" icon="settings" active={active === 'Settings'} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: cssVar('space.sm'),
              pt: cssVar('space.md'),
              px: cssVar('space.sm'),
              borderTop: `1px solid ${cssVar('color.border.divider')}`,
            }}
          >
            <Initials text="JL" />
            <Box>
              <Typography variant="body1" fontWeight={500}>Jamie Lee</Typography>
              <Typography variant="body2" color="text.secondary">Workspace admin</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Topbar() {
  return (
    <Box
      component="header"
      sx={{
        height: 72,
        px: cssVar('space.xl'),
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${cssVar('color.border.divider')}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ButtonBase sx={{ gap: cssVar('space.sm'), borderRadius: cssVar('shape.control') }} aria-label="Switch workspace">
        <Typography variant="body1" fontWeight={500}>Design operations</Typography>
        <Icon name="chevron-down" size={16} />
      </ButtonBase>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: cssVar('space.lg') }}>
        <IconButton aria-label="Notifications" sx={{ p: 0 }}>
          <Icon name="bell" />
        </IconButton>
        <Initials text="JL" size={36} />
      </Box>
    </Box>
  );
}

type PaginationProps = {
  page: number;
  pageCount: number;
  onChange?: (page: number) => void;
};

/** Previous / current page / next, as in the Figma "Table footer". */
export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  const controlSx = {
    width: cssVar('size.pagination-control'),
    height: cssVar('size.pagination-control'),
    borderRadius: cssVar('shape.control'),
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: cssVar('space.xs') }}>
      <IconButton aria-label="Previous page" disabled={page <= 1} onClick={() => onChange?.(page - 1)} sx={controlSx}>
        <Icon name="chevron-left" size={18} />
      </IconButton>
      <Typography
        variant="body1"
        fontWeight={500}
        aria-current="page"
        aria-label={`Page ${page} of ${pageCount}`}
        sx={{
          ...controlSx,
          display: 'grid',
          placeItems: 'center',
          bgcolor: cssVar('color.navigation.background-active'),
          color: cssVar('color.navigation.text-active'),
        }}
      >
        {page}
      </Typography>
      <IconButton aria-label="Next page" disabled={page >= pageCount} onClick={() => onChange?.(page + 1)} sx={controlSx}>
        <Icon name="chevron-right" size={18} />
      </IconButton>
    </Box>
  );
}

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  supportingText: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, supportingText, actions }: PageHeaderProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.sm') }}>
      <Typography variant="overline" color="text.secondary">{eyebrow}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: cssVar('space.md') }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.xs') }}>
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body1" color="text.secondary">{supportingText}</Typography>
        </Box>
        {actions && <Box sx={{ display: 'flex', gap: cssVar('space.sm') }}>{actions}</Box>}
      </Box>
    </Box>
  );
}

export function WorkspaceLayout({ active, children }: { active: WorkspacePage; children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar active={active} />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <Box component="main" sx={{ p: cssVar('space.xl'), display: 'flex', flexDirection: 'column', gap: cssVar('space.xl') }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
