import { render, screen } from '@testing-library/react';
import App from './App';

test('shows the login form for signed-out users', () => {
  localStorage.clear();
  render(<App />);
  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
});