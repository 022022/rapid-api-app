import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('Not Found Page', () => {
  it('opens Not Found Page', () => {
    render(<NotFound />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
