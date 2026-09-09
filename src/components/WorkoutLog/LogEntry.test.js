import { render, screen, fireEvent } from '@testing-library/react';
import LogEntry from './LogEntry';

const mockEntry = {
  id: '1',
  date: '2024-01-15',
  sets: 3,
  reps: 10,
  weight: 50,
  notes: 'Felt great!',
  difficulty: 'intermediate',
};

describe('LogEntry Component', () => {
  test('renders exercise name', () => {
    render(<LogEntry entry={mockEntry} exerciseName="Push-ups" />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('displays date', () => {
    render(<LogEntry entry={mockEntry} exerciseName="Push-ups" />);
    expect(screen.getByText(/📅/)).toBeInTheDocument();
  });

  test('displays sets', () => {
    render(<LogEntry entry={mockEntry} exerciseName="Push-ups" />);
    expect(screen.getByText('Sets')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('displays reps', () => {
    render(<LogEntry entry={mockEntry} exerciseName="Push-ups" />);
    expect(screen.getByText('Reps')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('displays weight', () => {
    render(<LogEntry entry={mockEntry} exerciseName="Push-ups" />);
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('50 lbs')).toBeInTheDocument();
  });

  test('displays difficulty badge', () => {
    render(<LogEntry entry={mockEntry} exerciseName="Push-ups" />);
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('intermediate')).toBeInTheDocument();
  });

  test('displays notes when provided', () => {
    render(<LogEntry entry={mockEntry} exerciseName="Push-ups" />);
    expect(screen.getByText('Felt great!')).toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(
      <LogEntry
        entry={mockEntry}
        exerciseName="Push-ups"
        onDelete={mockOnDelete}
      />
    );
    
    fireEvent.click(screen.getByText('🗑️'));
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('handles entry without weight', () => {
    const entryWithoutWeight = { ...mockEntry, weight: null };
    render(<LogEntry entry={entryWithoutWeight} exerciseName="Yoga" />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('displays N/A when difficulty is not provided', () => {
    const entryWithoutDifficulty = { ...mockEntry, difficulty: undefined };
    const { container } = render(
      <LogEntry entry={entryWithoutDifficulty} exerciseName="Push-ups" />
    );
    expect(container).toBeInTheDocument();
  });
});
