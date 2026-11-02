import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { cssVar } from '../theme/tokens';
import { Icon, type IconName } from './Icon';
import { StatusChip, type ProjectStatus } from './StatusChip';

export type Project = {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  dueDate: string;
  icon: IconName;
};

// Fixed columns from the Figma spec: Project 260 · Owner 176 · Status 176 · Due date 188
const columns = '260px 176px 176px 188px';

export function ProjectTableHeader() {
  return (
    <Box
      role="row"
      sx={{
        display: 'grid',
        gridTemplateColumns: columns,
        alignItems: 'center',
        height: cssVar('size.table-heading-height'),
        px: cssVar('project-row.space.lg'),
        bgcolor: 'background.default',
        borderBlock: `1px solid ${cssVar('color.border.divider')}`,
      }}
    >
      {['Project', 'Owner', 'Status', 'Due date'].map((h) => (
        <Typography key={h} role="columnheader" variant="overline" color="text.secondary">
          {h}
        </Typography>
      ))}
    </Box>
  );
}

// DS/ProjectRow — editable Name, Owner, Due date, status and Project icon slot; sizes from project-row/* tokens
export function ProjectRow({ project }: { project: Project }) {
  return (
    <Box
      role="row"
      sx={{
        display: 'grid',
        gridTemplateColumns: columns,
        alignItems: 'center',
        height: cssVar('project-row.size.table-row-height'),
        px: cssVar('project-row.space.lg'),
        bgcolor: cssVar('project-row.color.surface.default'),
        borderBottom: `1px solid ${cssVar('project-row.color.border.default')}`,
      }}
    >
      <Box role="cell" sx={{ display: 'flex', alignItems: 'center', gap: cssVar('project-row.space.sm') }}>
        <Box
          sx={{
            width: cssVar('size.avatar'),
            height: cssVar('size.avatar'),
            borderRadius: cssVar('project-row.shape.surface'),
            bgcolor: cssVar('project-row.color.surface.brand-subtle'),
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Icon name={project.icon} size={18} />
        </Box>
        <Typography variant="body1" fontWeight={500} noWrap>
          {project.name}
        </Typography>
      </Box>
      <Typography role="cell" variant="body1" color="text.secondary">
        {project.owner}
      </Typography>
      <Box role="cell">
        <StatusChip status={project.status} />
      </Box>
      <Typography role="cell" variant="body1" color="text.secondary">
        {project.dueDate}
      </Typography>
    </Box>
  );
}
