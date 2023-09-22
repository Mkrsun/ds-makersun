import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';

test('Tabs: Base test', () => {
  render(
    <Tabs>
      <div>De prueba</div>
    </Tabs>
  );
  const element = screen.getByTestId('ds-makersun-dozen-tabs');
  expect(element).toBeVisible();
  expect(element).toHaveClass('ds-makersun-dozen-tabs-container');
});
