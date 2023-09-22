import type { Meta, StoryObj } from '@storybook/react';

import Pill from './Pill';

const meta: Meta<typeof Pill> = {
  title: 'Atoms|Dozen|Pill',
  component: Pill,
};

export default meta;

type Story = StoryObj<typeof Pill>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Mini: Story = {
  render: () => <Pill type="mini" value="1" />,
};
