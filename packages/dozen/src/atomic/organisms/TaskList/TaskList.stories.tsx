import type { Meta, StoryObj } from '@storybook/react';
import TaskList from './TaskList';

const meta: Meta<typeof TaskList> = {
  title: 'Organism|Dozen|TaskList',
  component: TaskList,
};

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Primary: Story = {
  render: () => <TaskList />,
};