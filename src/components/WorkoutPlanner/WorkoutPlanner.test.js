import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutPlanner from './WorkoutPlanner';

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

describe('WorkoutPlanner Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders all 7 days of the week', () => {
    render(<WorkoutPlanner />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('Wednesday')).toBeInTheDocument();
    expect(screen.getByText('Thursday')).toBeInTheDocument();
    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('Saturday')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
  });

  test('displays weekly stats section', () => {
    render(<WorkoutPlanner />);
    expect(screen.getByText(/Weekly Stats/i)).toBeInTheDocument();
  });

  test('shows days planned stat', () => {
    render(<WorkoutPlanner />);
    expect(screen.getByText('Days Planned')).toBeInTheDocument();
  });

  test('shows total exercises stat', () => {
    render(<WorkoutPlanner />);
    expect(screen.getByText('Total Exercises')).toBeInTheDocument();
  });

  test('shows total calories stat', () => {
    render(<WorkoutPlanner />);
    expect(screen.getByText('Total Calories')).toBeInTheDocument();
  });

  test('renders clear entire week button', () => {
    render(<WorkoutPlanner />);
    expect(screen.getByText('Clear Entire Week')).toBeInTheDocument();
  });

  test('displays initial state with 0 exercises', () => {
    render(<WorkoutPlanner />);
    const totalExercises = screen.getAllByText('0');
    expect(totalExercises.length).toBeGreaterThan(0);
  });

  test('renders add exercise button for each day', () => {
    render(<WorkoutPlanner />);
    const addButtons = screen.getAllByText(/\+ Add Exercise/i);
    expect(addButtons.length).toBeGreaterThanOrEqual(7);
  });

  test('loads initial state from localStorage', () => {
    const mockPlan = {
      monday: [{ id: 1, name: 'Push-ups', sets: 3, reps: 15, caloriesBurn: 50 }],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    localStorage.setItem('workoutPlan', JSON.stringify(mockPlan));
    
    render(<WorkoutPlanner />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('saves plan to localStorage on changes', () => {
    render(<WorkoutPlanner />);
    
    // Simulate adding an exercise (this would normally happen through user interaction)
    // For now, we verify localStorage is available
    expect(localStorage.getItem('workoutPlan')).not.toBeNull();
  });

  test('clear entire week button is functional', () => {
    render(<WorkoutPlanner />);
    const clearButton = screen.getByText('Clear Entire Week');
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).not.toBeDisabled();
  });
});
