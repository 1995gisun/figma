import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchField } from './SearchField';

const meta = {
  title: 'Design System/SearchField',
  component: SearchField,
  args: { value: '', onChange: () => {} },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SearchField {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof SearchField>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValue: Story = { args: { value: 'Website' } };
