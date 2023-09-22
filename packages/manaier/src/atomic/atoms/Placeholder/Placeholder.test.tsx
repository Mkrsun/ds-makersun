import { render, screen } from '@testing-library/react';
import Placeholder from './Placeholder';

test('Placeholder: Base test', () => {
  render(<Placeholder />);
  const element = screen.getByTestId('ds-makersun-manaier-placeholder');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-manaier-placeholder-container');
});
