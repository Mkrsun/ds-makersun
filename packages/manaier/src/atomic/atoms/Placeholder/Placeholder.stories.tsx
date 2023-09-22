import type { Meta, StoryObj } from '@storybook/react';
import Placeholder from './Placeholder';

const meta: Meta<typeof Placeholder> = {
  title: 'Atom|Manaier|Placeholder',
  component: Placeholder,
};

export default meta;
type Story = StoryObj<typeof Placeholder>;

export const Primary: Story = {
  render: () => <Placeholder />,
};
