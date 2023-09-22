import { render, screen } from '@testing-library/react';
import MoveHand from './MoveHand';

test('MoveHand: Base test', () => {
  render(<MoveHand />);
  const element = screen.getByTestId('ds-makersun-dozen-move-hand');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-move-hand-container');
});
