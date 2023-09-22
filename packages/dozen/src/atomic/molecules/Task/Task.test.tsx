import { render, screen } from '@testing-library/react';
import Task from './Task';

test('Task: Base test', () => {
  render(<Task label="Probando test" />);
  const element = screen.getByTestId('ds-makersun-dozen-task');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-task-container');
});
