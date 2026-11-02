import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { ButtonOutlined, ButtonPrimary } from '../components/Buttons';
import { Icon } from '../components/Icon';
import { Initials } from '../components/Initials';
import { MetricCard } from '../components/MetricCard';
import { ProjectRow, ProjectTableHeader } from '../components/ProjectTable';
import { SearchField } from '../components/SearchField';
import { cssVar } from '../theme/tokens';
import { projects as allProjects } from './projectData';
import { PageHeader, Pagination, WorkspaceLayout } from './WorkspaceLayout';

const projects = allProjects.slice(0, 4);

const activity = [
  { initials: 'JL', text: 'Jamie updated Website redesign', time: '24 minutes ago' },
  { initials: 'AK', text: 'Alex requested a review', time: '1 hour ago' },
  { initials: 'SP', text: 'Sam published new components', time: '2 hours ago' },
];

function RecentProjects() {
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? projects.filter((p) => `${p.name} ${p.owner}`.toLowerCase().includes(q)) : projects;
  }, [query]);

  return (
    <Paper variant="outlined" sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          height: cssVar('size.table-toolbar-height'),
          p: cssVar('space.lg'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.xxs') }}>
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
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ p: cssVar('space.lg'), borderBottom: `1px solid ${cssVar('color.border.divider')}` }}
          >
            No projects match “{query}”.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          height: cssVar('size.table-footer-height'),
          px: cssVar('space.lg'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Showing {visible.length} of {allProjects.length} projects
        </Typography>
        <Pagination page={1} pageCount={1} />
      </Box>
    </Paper>
  );
}

function TeamActivity() {
  return (
    <Paper variant="outlined" sx={{ p: cssVar('space.lg'), display: 'flex', flexDirection: 'column', gap: cssVar('space.lg') }}>
      <Typography variant="h2" component="h2">Team activity</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.lg') }}>
        {activity.map((a, i) => (
          <Box key={a.text} sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.lg') }}>
            <Box sx={{ display: 'flex', gap: cssVar('space.sm'), alignItems: 'flex-start' }}>
              <Initials text={a.initials} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.xxs'), minWidth: 0 }}>
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
    <Box
      sx={{
        p: cssVar('space.lg'),
        borderRadius: cssVar('shape.surface'),
        bgcolor: 'primary.light',
        display: 'flex',
        flexDirection: 'column',
        gap: cssVar('space.md'),
      }}
    >
      <Icon name="layers" size={24} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: cssVar('space.xs') }}>
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
    <WorkspaceLayout active="Overview">
      <PageHeader
        eyebrow="WORKSPACE / OVERVIEW"
        title="Project overview"
        supportingText="Keep your team aligned and your work moving forward."
        actions={
          <>
            <ButtonOutlined label="Export report" />
            <ButtonPrimary label="New project" />
          </>
        }
      />

      <Box sx={{ display: 'flex', gap: cssVar('space.lg') }}>
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

      <Box sx={{ display: 'flex', gap: cssVar('space.lg'), alignItems: 'flex-start' }}>
        <RecentProjects />
        <Box sx={{ width: 288, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: cssVar('space.lg') }}>
          <TeamActivity />
          <SharedFoundation />
        </Box>
      </Box>
    </WorkspaceLayout>
  );
}
