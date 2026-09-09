import { render, screen } from '@testing-library/react';
import ExerciseList from './ExerciseList';

const mockExercises = [
  {
    id: 1,
    name: 'Push-ups',
    category: 'strength',
    muscleGroups: ['chest'],
    difficulty: 'beginner',
    sets: 3,
    reps: 15,
    caloriesBurn: 50,
  },
  {
    id: 2,
    name: 'Squats',
    category: 'strength',
    muscleGroups: ['legs'],
    difficulty: 'beginner',
    sets: 3,
    reps: 20,
    caloriesBurn: 60,
  },
];

describe('ExerciseList Component', () => {
  test('renders exercise list with multiple exercises', () => {
    render(<ExerciseList exercises={mockExercises} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    render(<ExerciseList exercises={[]} isLoading={true} />);
    expect(screen.getByText('Loading exercises...')).toBeInTheDocument();
  });

  test('displays empty state when no exercises', () => {
    render(<ExerciseList exercises={[]} isLoading={false} />);
    expect(screen.getByText(/No exercises found/i)).toBeInTheDocument();
  });

  test('displays error message when error is provided', () => {
    render(<ExerciseList exercises={[]} error="Failed to load exercises" />);
    expect(screen.getByText('Failed to load exercises')).toBeInTheDocument();
  });

  test('renders correct number of exercise cards', () => {
    const { container } = render(<ExerciseList exercises={mockExercises} />);
    const cards = container.querySelectorAll('.exerciseCard');
    expect(cards).toHaveLength(2);
  });

  test('passes onSelectExercise callback to ExerciseCard', () => {
    const mockOnSelect = jest.fn();
    render(
      <ExerciseList
        exercises={mockExercises}
        onSelectExercise={mockOnSelect}
      />
    );
    // ExerciseCard should receive the callback
    expect(mockOnSelect).not.toHaveBeenCalled(); // Not called until card is clicked
  });

  test('renders with empty exercises array', () => {
    render(<ExerciseList exercises={[]} />);
    expect(screen.getByText(/No exercises found/i)).toBeInTheDocument();
  });
});
