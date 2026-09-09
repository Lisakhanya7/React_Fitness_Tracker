import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseCard from './ExerciseCard';

// Mock exercise data
const mockExercise = {
  id: 1,
  name: 'Push-ups',
  category: 'strength',
  muscleGroups: ['chest', 'triceps'],
  difficulty: 'beginner',
  sets: 3,
  reps: 15,
  caloriesBurn: 50,
};

describe('ExerciseCard Component', () => {
  test('renders exercise name', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('displays difficulty badge', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  test('displays category', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText(/strength/i)).toBeInTheDocument();
  });

  test('displays sets and reps', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('3 sets × 15 reps')).toBeInTheDocument();
  });

  test('displays calories burned', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('50 calories/set')).toBeInTheDocument();
  });

  test('calls onSelect when clicked', () => {
    const mockOnSelect = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('Push-ups'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockExercise.id);
  });

  test('renders add to workout button when onAddToWorkout is provided', () => {
    const mockOnAdd = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onAddToWorkout={mockOnAdd} />);
    expect(screen.getByText('+ Add to Workout')).toBeInTheDocument();
  });

  test('calls onAddToWorkout when add button is clicked', () => {
    const mockOnAdd = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onAddToWorkout={mockOnAdd} />);
    fireEvent.click(screen.getByText('+ Add to Workout'));
    expect(mockOnAdd).toHaveBeenCalledWith(mockExercise);
  });

  test('shows "In Plan" button when isInPlan is true', () => {
    render(<ExerciseCard exercise={mockExercise} isInPlan={true} />);
    expect(screen.getByText('✓ In Plan')).toBeInTheDocument();
  });

  test('displays muscle groups', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('chest, triceps')).toBeInTheDocument();
  });
});
