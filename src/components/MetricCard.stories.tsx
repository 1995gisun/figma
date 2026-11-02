import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { Icon } from './Icon';
import { MetricCard } from './MetricCard';

const meta = {
  title: 'Design System/MetricCard',
  component: MetricCard,
  args: {
    label: 'Active projects',
    value: '8',
    supportingText: '+2 this month',
    icon: <Icon name="folder-open" />,
  },
  argTypes: { icon: { control: false } },
  decorators: [(Story) => <Box sx={{ display: 'flex', width: 320 }}><Story /></Box>],
} satisfies Meta<typeof MetricCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Neutral: Story = {
  args: { label: 'Upcoming deadlines', value: '3', supportingText: 'Next 7 days', tone: 'neutral', icon: <Icon name="calendar-days" /> },
};
