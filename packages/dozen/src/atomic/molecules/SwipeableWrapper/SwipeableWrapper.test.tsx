import { render, screen } from '@testing-library/react';
import SwipeableWrapper from './SwipeableWrapper';

test('SwipeableContainer: Base test', () => {
  render(
    <SwipeableWrapper overlayColor="#B8FFB5">
      <p>Hola Mundo</p>{' '}
    </SwipeableWrapper>
  );
  const element = screen.getByTestId('ds-makersun-dozen-swipeable-container');
  expect(element).toBeVisible();
  expect(element).toHaveClass(
    'ds-makersun-dozen-swipeable-container-container'
  );
});
