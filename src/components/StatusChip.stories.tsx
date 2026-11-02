import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { StatusChip } from './StatusChip';

const meta = {
  title: 'Design System/StatusChip',
  component: StatusChip,
  args: { status: 'In progress' },
  argTypes: { status: { control: 'inline-radio', options: ['In progress', 'In review', 'Completed'] } },
} satisfies Meta<typeof StatusChip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllStatuses: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <StatusChip status="In progress" />
      <StatusChip status="In review" />
      <StatusChip status="Completed" />
    </Box>
  ),
};
