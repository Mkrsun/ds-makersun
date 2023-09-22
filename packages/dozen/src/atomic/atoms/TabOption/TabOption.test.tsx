import { render, screen } from '@testing-library/react';
import TabOption from './TabOption';

test('TabOption: Base test', () => {
  render(<TabOption label="To do" />);
  const element = screen.getByTestId('ds-makersun-dozen-tab-option');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-tab-option-container');
});
