import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/testUtils';
import Main from './Main';

describe('Main', () => {
  it('opens', () => {
    renderWithProviders(<Main />);
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });
});