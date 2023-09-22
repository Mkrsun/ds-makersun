import type { Meta, StoryObj } from '@storybook/react';
import TabOption from './TabOption';

const meta: Meta<typeof TabOption> = {
  title: 'Atom|Dozen|TabOption',
  component: TabOption,
};

export default meta;
type Story = StoryObj<typeof TabOption>;

export const Primary: Story = {
  render: () => <TabOption label="To do" />,
};
