import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseDetail from './ExerciseDetail';

const mockExercise = {
  id: 1,
  name: 'Push-ups',
  category: 'strength',
  muscleGroups: ['chest', 'shoulders'],
  difficulty: 'beginner',
  duration: 20,
  sets: 3,
  reps: 15,
  caloriesBurn: 50,
  instructions: ['Get in plank position', 'Lower your body', 'Push back up'],
  videoUrl: 'https://www.youtube.com/embed/test123',
  equipment: ['None'],
};

describe('ExerciseDetail Component', () => {
  test('renders modal content with exercise name', () => {
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('does not render when exercise is null', () => {
    const { container } = render(
      <ExerciseDetail
        exercise={null}
        onClose={jest.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test('displays exercise name in modal', () => {
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('displays difficulty badge', () => {
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  test('displays muscle groups', () => {
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('chest')).toBeInTheDocument();
    expect(screen.getByText('shoulders')).toBeInTheDocument();
  });

  test('displays sets and reps', () => {
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText(/3 sets × 15 reps/i)).toBeInTheDocument();
  });

  test('displays instructions', () => {
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Get in plank position')).toBeInTheDocument();
    expect(screen.getByText('Lower your body')).toBeInTheDocument();
  });

  test('renders video player with videoUrl', () => {
    const { container } = render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
      />
    );
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={mockOnClose}
      />
    );
    
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('displays add to workout button', () => {
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText(/Add to Workout/i)).toBeInTheDocument();
  });

  test('shows already added state when isInPlan is true', () => {
    render(
      <ExerciseDetail
        exercise={mockExercise}
        onClose={jest.fn()}
        isInPlan={true}
      />
    );
    expect(screen.getByText('✓ In Workout Plan')).toBeInTheDocument();
  });
});
