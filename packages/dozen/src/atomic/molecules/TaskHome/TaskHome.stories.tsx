import type { Meta, StoryObj } from '@storybook/react';
import TaskHome from './TaskHome';

const meta: Meta<typeof TaskHome> = {
  title: 'Molecule|Dozen|TaskHome',
  component: TaskHome,
};

export default meta;
type Story = StoryObj<typeof TaskHome>;

export const Primary: Story = {
  render: () => <TaskHome label="Mi task de prueba" />,
};
