import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('Greeting: Base test', () => {
  render(<Greeting label="Probando manu :)" />);
  const element = screen.getByTestId('ds-makersun-dozen-greeting');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-greeting-container');
});
