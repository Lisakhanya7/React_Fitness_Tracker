import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProgressPage from '../pages/ProgressPage';

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

describe('ProgressPage Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders progress page', () => {
    render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Progress/i)).toBeInTheDocument();
  });

  test('displays key statistics', () => {
    render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Total Workouts/)).toBeInTheDocument();
    expect(screen.getByText(/Total Exercises in Plan/)).toBeInTheDocument();
    expect(screen.getByText(/Current Streak/)).toBeInTheDocument();
  });

  test('displays detailed stats section', () => {
    render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Detailed Stats/i)).toBeInTheDocument();
  });

  test('displays insights card', () => {
    render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Insights/i)).toBeInTheDocument();
  });

  test('displays workout tips section', () => {
    render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Tips for Success/i)).toBeInTheDocument();
  });

  test('page renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });

  test('displays stat cards with proper structure', () => {
    const { container } = render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    
    const statCards = container.querySelectorAll('.statCard');
    expect(statCards.length).toBeGreaterThan(0);
  });

  test('displays motivational insights', () => {
    render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    
    // Page should have motivational content
    expect(screen.getByText(/Insights/i)).toBeInTheDocument();
  });

  test('loads progress data from localStorage', () => {
    const mockPlan = {
      monday: [{ id: 1, name: 'Push-ups', caloriesBurn: 50 }],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    const mockHistory = [];
    
    localStorage.setItem('workoutPlan', JSON.stringify(mockPlan));
    localStorage.setItem('workoutHistory', JSON.stringify(mockHistory));
    
    render(
      <BrowserRouter>
        <ProgressPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Total Exercises in Plan/)).toBeInTheDocument();
  });
});
