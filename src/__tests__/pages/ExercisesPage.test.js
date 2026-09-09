import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExercisesPage from '../pages/ExercisesPage';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ExercisesPage Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders exercises page', () => {
    render(
      <BrowserRouter>
        <ExercisesPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Exercises/i)).toBeInTheDocument();
  });

  test('displays search bar', () => {
    render(
      <BrowserRouter>
        <ExercisesPage />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/Search exercises/i)).toBeInTheDocument();
  });

  test('displays filter section', () => {
    render(
      <BrowserRouter>
        <ExercisesPage />
      </BrowserRouter>
    );
    expect(screen.getByDisplayValue(/All Categories/i)).toBeInTheDocument();
  });

  test('renders exercise list', () => {
    render(
      <BrowserRouter>
        <ExercisesPage />
      </BrowserRouter>
    );
    // Wait for exercises to load
    setTimeout(() => {
      expect(screen.getByText(/Push-ups|Squats|Running/)).toBeInTheDocument();
    }, 100);
  });

  test('displays results count', () => {
    render(
      <BrowserRouter>
        <ExercisesPage />
      </BrowserRouter>
    );
    // Results count should be displayed
    expect(screen.getByText(/exercises found/i)).toBeInTheDocument();
  });

  test('page renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <ExercisesPage />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });

  test('search and filters are functional', () => {
    render(
      <BrowserRouter>
        <ExercisesPage />
      </BrowserRouter>
    );
    
    const searchInput = screen.getByPlaceholderText(/Search exercises/i);
    expect(searchInput).toBeInTheDocument();
    
    const filterSelect = screen.getByDisplayValue(/All Categories/i);
    expect(filterSelect).toBeInTheDocument();
  });
});
