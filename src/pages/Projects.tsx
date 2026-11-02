import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { ButtonOutlined, ButtonPrimary } from '../components/Buttons';
import { Icon } from '../components/Icon';
import { MetricCard } from '../components/MetricCard';
import { ProjectRow, ProjectTableHeader } from '../components/ProjectTable';
import { SearchField } from '../components/SearchField';
import { cssVar } from '../theme/tokens';
import { projects } from './projectData';
import { PageHeader, Pagination, WorkspaceLayout } from './WorkspaceLayout';

const pageSize = 5;

const countBy = (status: string) => projects.filter((p) => p.status === status).length;

function AllProjects() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? projects.filter((p) => `${p.name} ${p.owner} ${p.status}`.toLowerCase().includes(q)) : projects;
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  const visible = matches.slice((page - 1) * pageSize, page * pageSize);
  const first = matches.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = (page - 1) * pageSize + visible.length;

  const search = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
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
          <Typography variant="h2" component="h2">All projects</Typography>
          <Typography variant="body1" color="text.secondary">Search by project, owner or status.</Typography>
        </Box>
        <SearchField value={query} onChange={search} />
      </Box>
      <Box role="table" aria-label="All projects">
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
          Showing {first}–{last} of {matches.length} projects
        </Typography>
        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      </Box>
    </Paper>
  );
}

export function Projects() {
  return (
    <WorkspaceLayout active="Projects">
      <PageHeader
        eyebrow="WORKSPACE / PROJECTS"
        title="Projects"
        supportingText="Every project in your workspace, in one place."
        actions={
          <>
            <ButtonOutlined label="Export list" />
            <ButtonPrimary label="New project" />
          </>
        }
      />

      <Box sx={{ display: 'flex', gap: cssVar('space.lg') }}>
        <MetricCard
          label="In progress"
          value={String(countBy('In progress'))}
          supportingText={`of ${projects.length} projects`}
          tone="neutral"
          icon={<Icon name="folder-open" />}
        />
        <MetricCard
          label="In review"
          value={String(countBy('In review'))}
          supportingText="Waiting for feedback"
          tone="neutral"
          icon={<Icon name="calendar-days" />}
        />
        <MetricCard
          label="Completed"
          value={String(countBy('Completed'))}
          supportingText="+1 this month"
          icon={<Icon name="circle-check" />}
        />
      </Box>

      <AllProjects />
    </WorkspaceLayout>
  );
}
