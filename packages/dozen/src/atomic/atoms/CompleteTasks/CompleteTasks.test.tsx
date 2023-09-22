import { render, screen } from '@testing-library/react';
import CompleteTasks from './CompleteTasks';

test('CompleteTasks: Base test', () => {
  render(<CompleteTasks />);
  const element = screen.getByTestId('ds-makersun-dozen-complete-tasks');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-complete-tasks-container');
});
