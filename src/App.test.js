import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders the FitTracker home page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/Welcome to FitTracker/i)).toBeInTheDocument();
  expect(screen.getByText(/Today's Workout/i)).toBeInTheDocument();
});
