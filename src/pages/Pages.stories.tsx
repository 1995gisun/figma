import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentLibrary } from './ComponentLibrary';
import { ProjectOverview } from './ProjectOverview';

const meta = {
  title: 'Pages',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = { render: () => <ProjectOverview /> };

export const Components: Story = { render: () => <ComponentLibrary /> };
