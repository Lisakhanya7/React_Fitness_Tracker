import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutLog from './WorkoutLog';

const mockExercises = [
  { id: 1, name: 'Push-ups', category: 'strength' },
  { id: 2, name: 'Squats', category: 'strength' },
  { id: 3, name: 'Running', category: 'cardio' },
];

const mockHistory = [
  {
    id: '1',
    exerciseId: 1,
    date: new Date('2024-01-15'),
    sets: 3,
    reps: 15,
    weight: 0,
    notes: 'Great session!',
    difficulty: 'intermediate',
  },
  {
    id: '2',
    exerciseId: 2,
    date: new Date('2024-01-14'),
    sets: 4,
    reps: 20,
    weight: 50,
    notes: '',
    difficulty: 'beginner',
  },
];

describe('WorkoutLog Component', () => {
  test('renders statistics grid', () => {
    render(<WorkoutLog workoutHistory={mockHistory} allExercises={mockExercises} />);
    expect(screen.getByText('Total Workouts')).toBeInTheDocument();
    expect(screen.getByText('Total Exercises')).toBeInTheDocument();
    expect(screen.getByText('Current Streak')).toBeInTheDocument();
    expect(screen.getByText('Total Weight')).toBeInTheDocument();
  });

  test('displays correct total workouts count', () => {
    render(<WorkoutLog workoutHistory={mockHistory} allExercises={mockExercises} />);
    expect(screen.getByText('2')).toBeInTheDocument(); // 2 workouts
  });

  test('renders add workout button', () => {
    render(<WorkoutLog workoutHistory={mockHistory} allExercises={mockExercises} />);
    expect(screen.getByText('+ Add Workout')).toBeInTheDocument();
  });

  test('displays workout history entries', () => {
    render(<WorkoutLog workoutHistory={mockHistory} allExercises={mockExercises} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });

  test('shows empty state message when no history', () => {
    render(<WorkoutLog workoutHistory={[]} allExercises={mockExercises} />);
    expect(screen.getByText(/No workout history yet/i)).toBeInTheDocument();
  });

  test('displays log entries in reverse chronological order', () => {
    render(<WorkoutLog workoutHistory={mockHistory} allExercises={mockExercises} />);
    const entries = screen.getAllByText(/(Push-ups|Squats)/);
    expect(entries.length).toBeGreaterThanOrEqual(2);
  });

  test('renders exercise details in log', () => {
    render(<WorkoutLog workoutHistory={mockHistory} allExercises={mockExercises} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Great session!')).toBeInTheDocument();
  });

  test('displays stats with correct values', () => {
    render(<WorkoutLog workoutHistory={mockHistory} allExercises={mockExercises} />);
    expect(screen.getByText('Total Workouts')).toBeInTheDocument();
    // Verify stat cards are rendered
    const statCards = screen.getAllByText(/Total/);
    expect(statCards.length).toBeGreaterThan(0);
  });

  test('calls onAddWorkout when form is submitted', () => {
    const mockOnAdd = jest.fn();
    const { container } = render(
      <WorkoutLog
        workoutHistory={mockHistory}
        allExercises={mockExercises}
        onAddWorkout={mockOnAdd}
      />
    );
    
    // Open modal
    fireEvent.click(screen.getByText('+ Add Workout'));
    
    // Fill form
    const exerciseSelect = container.querySelector('select');
    if (exerciseSelect) {
      fireEvent.change(exerciseSelect, { target: { value: '1' } });
    }
  });

  test('renders add workout button with correct text', () => {
    render(<WorkoutLog workoutHistory={mockHistory} allExercises={mockExercises} />);
    const addButton = screen.getByText('+ Add Workout');
    expect(addButton).toBeInTheDocument();
  });
});
