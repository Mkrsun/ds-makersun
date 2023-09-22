import type { Meta, StoryObj } from '@storybook/react';
import CompleteTasks from './CompleteTasks';

const meta: Meta<typeof CompleteTasks> = {
  title: 'Atom|Dozen|CompleteTasks',
  component: CompleteTasks,
};

export default meta;
type Story = StoryObj<typeof CompleteTasks>;

export const Primary: Story = {
  render: () => <CompleteTasks />,
};