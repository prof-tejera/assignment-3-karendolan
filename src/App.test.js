/**
 * Example App test from https://github.com/prof-tejera/react8/blob/main/src/App.test.js
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Timers/i);
  expect(linkElement).toBeInTheDocument();
});
