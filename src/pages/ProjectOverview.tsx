import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { ButtonOutlined, ButtonPrimary } from '../components/Buttons';
import { Icon, type IconName } from '../components/Icon';
import { Initials } from '../components/Initials';
import { MetricCard } from '../components/MetricCard';
import { ProjectRow, ProjectTableHeader, type Project } from '../components/ProjectTable';
import { SearchField } from '../components/SearchField';
import { color, radius } from '../theme/tokens';

const mainNav: { label: string; icon: IconName }[] = [
  { label: 'Overview', icon: 'layout-dashboard' },
  { label: 'Projects', icon: 'nav-folder-open' },
  { label: 'Team', icon: 'users' },
  { label: 'Reports', icon: 'chart-no-axes-combined' },
];

const projects: Project[] = [
  { id: 'p1', name: 'Website redesign', owner: 'Jamie Lee', status: 'In progress', dueDate: 'Nov 12', icon: 'panels-top-left' },
  { id: 'p2', name: 'Mobile app', owner: 'Alex Kim', status: 'In review', dueDate: 'Nov 18', icon: 'smartphone' },
  { id: 'p3', name: 'Design system', owner: 'Sam Park', status: 'In progress', dueDate: 'Nov 24', icon: 'component' },
  { id: 'p4', name: 'Customer portal', owner: 'Taylor Chen', status: 'Completed', dueDate: 'Nov 28', icon: 'monitor' },
];

const activity = [
  { initials: 'JL', text: 'Jamie updated Website redesign', time: '24 minutes ago' },
  { initials: 'AK', text: 'Alex requested a review', time: '1 hour ago' },
  { initials: 'SP', text: 'Sam published new components', time: '2 hours ago' },
];

function NavItem({ label, icon, active, onClick }: { label: string; icon: IconName; active?: boolean; onClick?: () => void }) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      sx={{
        width: '100%',
        height: 44,
        px: 4,
        gap: 3,
        justifyContent: 'flex-start',
        borderRadius: `${radius.sm}px`,
        bgcolor: active ? 'primary.light' : 'background.paper',
        '&:hover': { bgcolor: active ? 'primary.light' : 'background.default' },
      }}
    >
      <Icon name={icon} />
      <Typography variant="body1" fontWeight={active ? 500 : 400} color={active ? 'primary.main' : 'text.secondary'}>
        {label}
      </Typography>
    </ButtonBase>
  );
}

function Sidebar() {
  const [active, setActive] = useState('Overview');
  return (
    <Box
      component="nav"
      sx={{
        width: 216,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: `1px solid ${color.neutral200}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <Box sx={{ height: 72, px: 6, display: 'flex', alignItems: 'center', borderBottom: `1px solid ${color.neutral200}` }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Workspace</Typography>
      </Box>
      <Box sx={{ flex: 1, pt: 6, pb: 4, px: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {mainNav.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              active={active === item.label}
              onClick={() => setActive(item.label)}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NavItem label="Settings" icon="settings" active={active === 'Settings'} onClick={() => setActive('Settings')} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, pt: 4, px: 3, borderTop: `1px solid ${color.neutral200}` }}>
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
        px: 8,
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${color.neutral200}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ButtonBase sx={{ gap: 3, borderRadius: `${radius.sm}px` }} aria-label="Switch workspace">
        <Typography variant="body1" fontWeight={500}>Design operations</Typography>
        <Icon name="chevron-down" size={16} />
      </ButtonBase>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <IconButton aria-label="Notifications" sx={{ p: 0 }}>
          <Icon name="bell" />
        </IconButton>
        <Initials text="JL" size={36} />
      </Box>
    </Box>
  );
}

function RecentProjects() {
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? projects.filter((p) => `${p.name} ${p.owner}`.toLowerCase().includes(q)) : projects;
  }, [query]);

  return (
    <Paper variant="outlined" sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
      <Box sx={{ height: 104, p: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h2" component="h2">Recent projects</Typography>
          <Typography variant="body1" color="text.secondary">A shared view of what your team is working on.</Typography>
        </Box>
        <SearchField value={query} onChange={setQuery} />
      </Box>
      <Box role="table" aria-label="Recent projects">
        <ProjectTableHeader />
        {visible.map((p) => (
          <ProjectRow key={p.id} project={p} />
        ))}
        {visible.length === 0 && (
          <Typography variant="body1" color="text.secondary" sx={{ px: 6, py: 6, borderBottom: `1px solid ${color.neutral200}` }}>
            No projects match “{query}”.
          </Typography>
        )}
      </Box>
      <Box sx={{ height: 56, px: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="text.secondary">
          Showing {visible.length} of 8 projects
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton aria-label="Previous page" sx={{ width: 32, height: 32, borderRadius: `${radius.sm}px` }}>
            <Icon name="chevron-left" size={18} />
          </IconButton>
          <Box
            aria-current="page"
            sx={{
              width: 32,
              height: 32,
              display: 'grid',
              placeItems: 'center',
              borderRadius: `${radius.sm}px`,
              bgcolor: 'primary.light',
              color: 'primary.main',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            1
          </Box>
          <IconButton aria-label="Next page" sx={{ width: 32, height: 32, borderRadius: `${radius.sm}px` }}>
            <Icon name="chevron-right" size={18} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

function TeamActivity() {
  return (
    <Paper variant="outlined" sx={{ p: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Typography variant="h2" component="h2">Team activity</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {activity.map((a, i) => (
          <Box key={a.text} sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
              <Initials text={a.initials} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                <Typography variant="body1">{a.text}</Typography>
                <Typography variant="body2" color="text.secondary">{a.time}</Typography>
              </Box>
            </Box>
            {i < activity.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

function SharedFoundation() {
  return (
    <Box sx={{ p: 6, borderRadius: `${radius.md}px`, bgcolor: 'primary.light', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Icon name="layers" size={24} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" color="primary.dark">Everything in sync</Typography>
        <Typography variant="body1" color="text.secondary">
          One set of tokens. Shared across design and development.
        </Typography>
      </Box>
    </Box>
  );
}

export function ProjectOverview() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <Box component="main" sx={{ p: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="overline" color="text.secondary">WORKSPACE / OVERVIEW</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h1">Project overview</Typography>
                <Typography variant="body1" color="text.secondary">
                  Keep your team aligned and your work moving forward.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <ButtonOutlined label="Export report" />
                <ButtonPrimary label="New project" />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 6 }}>
            <MetricCard label="Active projects" value="8" supportingText="+2 this month" icon={<Icon name="folder-open" />} />
            <MetricCard
              label="Upcoming deadlines"
              value="3"
              supportingText="Next 7 days"
              tone="neutral"
              icon={<Icon name="calendar-days" />}
            />
            <MetricCard label="Completion rate" value="84%" supportingText="+12% this month" icon={<Icon name="circle-check" />} />
          </Box>

          <Box sx={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
            <RecentProjects />
            <Box sx={{ width: 288, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <TeamActivity />
              <SharedFoundation />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
