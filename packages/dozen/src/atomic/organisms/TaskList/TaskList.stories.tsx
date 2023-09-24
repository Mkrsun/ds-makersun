import type { Meta, StoryObj } from '@storybook/react';
import TaskList from './TaskList';
import { TaskEntity } from './TaskList';

const arr: TaskEntity[] = [
  {
    id: '1',
    label: 'Nombre 1',
    state: 'reorder',
    isDragging: false,
  },
];

const meta: Meta<typeof TaskList> = {
  title: 'Organism|Dozen|TaskList',
  component: TaskList,
};

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Primary: Story = {
  render: () => <TaskList tasks={arr} />,
};