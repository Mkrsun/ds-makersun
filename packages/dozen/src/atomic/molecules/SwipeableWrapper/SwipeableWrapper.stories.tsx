import type { Meta, StoryObj } from '@storybook/react';
import SwipeableWrapper from './SwipeableWrapper';

const meta: Meta<typeof SwipeableWrapper> = {
  title: 'Molecule|Dozen|SwipeableWrapper',
  component: SwipeableWrapper,
};

export default meta;
type Story = StoryObj<typeof SwipeableWrapper>;

export const Primary: Story = {
  render: () => (
    <SwipeableWrapper overlayColor="#B8FFB5">
      <p>Hola Mundo</p>
    </SwipeableWrapper>
  ),
};
