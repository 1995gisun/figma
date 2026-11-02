import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { ButtonOutlined, ButtonPrimary } from './Buttons';

const meta = {
  title: 'Design System/Buttons',
  component: ButtonPrimary,
  args: { label: 'New project' },
} satisfies Meta<typeof ButtonPrimary>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outlined: Story = {
  args: { label: 'Export report' },
  render: (args) => <ButtonOutlined {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <ButtonPrimary {...args} />
      <ButtonOutlined {...args} label="Export report" />
    </Box>
  ),
};
