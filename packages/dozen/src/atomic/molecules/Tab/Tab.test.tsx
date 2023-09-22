import { render, screen } from '@testing-library/react';
import Tab from './Tab';

test('Tab: Base test', () => {
  render(<Tab />);
  const element = screen.getByTestId('ds-makersun-dozen-tab');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-tab-container');
});
