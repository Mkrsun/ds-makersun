import { render, screen } from '@testing-library/react';
import Pill from './Pill';

test('Pill: Base test', () => {
  render(<Pill />);
  const element = screen.getByTestId('ds-makersun-dozen-pill');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-pill-container');
});
