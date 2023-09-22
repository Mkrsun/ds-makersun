import type { Meta, StoryObj } from '@storybook/react';
import MoveHand from './MoveHand';

const meta: Meta<typeof MoveHand> = {
  title: 'Atom|Dozen|MoveHand',
  component: MoveHand,
};

export default meta;
type Story = StoryObj<typeof MoveHand>;

export const Primary: Story = {
  render: () => <MoveHand />,
};