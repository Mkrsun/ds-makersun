import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

test('TaskList: Base test', () => {
  render(<TaskList />);
  const element = screen.getByTestId('ds-makersun-dozen-task-list');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-task-list-container');
});
