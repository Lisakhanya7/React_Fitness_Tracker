import { render, screen, fireEvent } from '@testing-library/react';
import DayCard from './DayCard';

const mockExercises = [
  {
    id: 1,
    name: 'Push-ups',
    sets: 3,
    reps: 15,
    caloriesBurn: 50,
  },
  {
    id: 2,
    name: 'Squats',
    sets: 3,
    reps: 20,
    caloriesBurn: 60,
  },
];

describe('DayCard Component', () => {
  test('renders day name', () => {
    render(<DayCard day="monday" exercises={[]} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
  });

  test('displays exercise count', () => {
    render(<DayCard day="monday" exercises={mockExercises} />);
    expect(screen.getByText('2 exercises')).toBeInTheDocument();
  });

  test('displays total calories', () => {
    render(<DayCard day="monday" exercises={mockExercises} />);
    expect(screen.getByText(/330 cal/)).toBeInTheDocument(); // (50 + 60) * 3
  });

  test('displays empty message when no exercises', () => {
    render(<DayCard day="monday" exercises={[]} />);
    expect(screen.getByText(/No exercises planned for Monday/i)).toBeInTheDocument();
  });

  test('renders exercise list', () => {
    render(<DayCard day="monday" exercises={mockExercises} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });

  test('displays sets and reps for each exercise', () => {
    render(<DayCard day="monday" exercises={mockExercises} />);
    expect(screen.getByText('3 × 15')).toBeInTheDocument();
    expect(screen.getByText('3 × 20')).toBeInTheDocument();
  });

  test('calls onRemoveExercise when remove button is clicked', () => {
    const mockOnRemove = jest.fn();
    render(
      <DayCard
        day="monday"
        exercises={mockExercises}
        onRemoveExercise={mockOnRemove}
      />
    );
    
    const removeButtons = screen.getAllByText('✕');
    fireEvent.click(removeButtons[0]);
    expect(mockOnRemove).toHaveBeenCalledWith('monday', 0);
  });

  test('calls onClearDay when clear button is clicked', () => {
    const mockOnClear = jest.fn();
    render(
      <DayCard
        day="monday"
        exercises={mockExercises}
        onClearDay={mockOnClear}
      />
    );
    
    fireEvent.click(screen.getByText('Clear Day'));
    expect(mockOnClear).toHaveBeenCalledWith('monday');
  });

  test('disables clear button when no exercises', () => {
    render(<DayCard day="monday" exercises={[]} />);
    expect(screen.getByText('Clear Day')).toBeDisabled();
  });
});
