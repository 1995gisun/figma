import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { ProjectRow, ProjectTableHeader } from './ProjectTable';

const meta = {
  title: 'Design System/ProjectRow',
  component: ProjectRow,
  args: {
    project: { id: 'p1', name: 'Website redesign', owner: 'Jamie Lee', status: 'In progress', dueDate: 'Nov 12', icon: 'panels-top-left' },
  },
  decorators: [
    (Story) => (
      <Box role="table" sx={{ bgcolor: 'background.paper', width: 'fit-content' }}>
        <ProjectTableHeader />
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof ProjectRow>;
export default meta;

type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};

export const InReview: Story = {
  args: { project: { id: 'p2', name: 'Mobile app', owner: 'Alex Kim', status: 'In review', dueDate: 'Nov 18', icon: 'smartphone' } },
};

export const Completed: Story = {
  args: { project: { id: 'p4', name: 'Customer portal', owner: 'Taylor Chen', status: 'Completed', dueDate: 'Nov 28', icon: 'monitor' } },
};
