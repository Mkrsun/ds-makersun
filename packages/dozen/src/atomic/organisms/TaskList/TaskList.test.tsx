import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

import { TaskEntity } from './TaskList';

const arr: TaskEntity[] = [
  {
    id: '1',
    label: 'Nombre 1',
    state: 'reorder',
    isDragging: false,
  },
];

test('TaskList: Base test', () => {
  render(<TaskList tasks={arr} />);
  const element = screen.getByTestId('ds-makersun-dozen-task-list');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-task-list-container');
});
