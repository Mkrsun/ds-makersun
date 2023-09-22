import type { Meta, StoryObj } from '@storybook/react';
import Task from './Task';

const meta: Meta<typeof Task> = {
  title: 'Molecule|Dozen|Task',
  component: Task,
};

export default meta;
type Story = StoryObj<typeof Task>;

export const Primary: Story = {
  render: () => <Task label="Probando label" />,
};
