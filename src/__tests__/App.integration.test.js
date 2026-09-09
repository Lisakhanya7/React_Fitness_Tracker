import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock window.matchMedia for responsive behavior
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('App Integration Tests', () => {
  test('renders app without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/FitTracker/i)).toBeInTheDocument();
  });

  test('renders navbar with navigation links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Exercises')).toBeInTheDocument();
    expect(screen.getByText('Planner')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/© 2024 FitTracker/)).toBeInTheDocument();
  });

  test('renders home page content', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Today's Workout/i)).toBeInTheDocument();
  });

  test('app structure has proper layout', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const appContainer = container.querySelector('.App');
    expect(appContainer).toBeInTheDocument();
    
    const mainContent = container.querySelector('.mainContent');
    expect(mainContent).toBeInTheDocument();
  });

  test('navbar is sticky positioned', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const navbar = container.querySelector('.navbar');
    const styles = window.getComputedStyle(navbar);
    expect(styles.position).toBe('sticky');
  });

  test('footer is visible in DOM', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const footer = container.querySelector('.footer');
    expect(footer).toBeInTheDocument();
  });
});
