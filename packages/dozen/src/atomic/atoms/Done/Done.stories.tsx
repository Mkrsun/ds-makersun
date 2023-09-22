import type { Meta, StoryObj } from '@storybook/react';
import Done from './Done';

const meta: Meta<typeof Done> = {
  title: 'Atom|Dozen|Done',
  component: Done,
};

export default meta;
type Story = StoryObj<typeof Done>;

export const Primary: Story = {
  render: () => <Done />,
};