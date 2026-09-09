import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseFilter from './ExerciseFilter';

describe('ExerciseFilter Component', () => {
  const mockOnCategoryChange = jest.fn();
  const mockOnDifficultyChange = jest.fn();
  const mockOnMuscleGroupChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders category dropdown', () => {
    render(
      <ExerciseFilter
        category="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );
    expect(screen.getByDisplayValue('All Categories')).toBeInTheDocument();
  });

  test('renders difficulty dropdown', () => {
    render(
      <ExerciseFilter
        difficulty="all"
        onDifficultyChange={mockOnDifficultyChange}
      />
    );
    expect(screen.getByDisplayValue('All Levels')).toBeInTheDocument();
  });

  test('renders muscle group dropdown', () => {
    render(
      <ExerciseFilter
        muscleGroup="all"
        onMuscleGroupChange={mockOnMuscleGroupChange}
      />
    );
    const allSelects = screen.getAllByRole('combobox');
    expect(allSelects.length).toBeGreaterThanOrEqual(3);
  });

  test('calls onCategoryChange when category changes', () => {
    render(
      <ExerciseFilter
        category="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );
    const categorySelect = screen.getByDisplayValue('All Categories');
    fireEvent.change(categorySelect, { target: { value: 'strength' } });
    
    expect(mockOnCategoryChange).toHaveBeenCalledWith('strength');
  });

  test('calls onDifficultyChange when difficulty changes', () => {
    render(
      <ExerciseFilter
        difficulty="all"
        onDifficultyChange={mockOnDifficultyChange}
      />
    );
    const difficultySelect = screen.getByDisplayValue('All Levels');
    fireEvent.change(difficultySelect, { target: { value: 'beginner' } });
    
    expect(mockOnDifficultyChange).toHaveBeenCalledWith('beginner');
  });

  test('displays selected category value', () => {
    const { rerender } = render(
      <ExerciseFilter
        category="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );
    expect(screen.getByDisplayValue('All Categories')).toBeInTheDocument();
    
    rerender(
      <ExerciseFilter
        category="cardio"
        onCategoryChange={mockOnCategoryChange}
      />
    );
    expect(screen.getByDisplayValue('Cardio')).toBeInTheDocument();
  });

  test('displays selected difficulty value', () => {
    const { rerender } = render(
      <ExerciseFilter
        difficulty="all"
        onDifficultyChange={mockOnDifficultyChange}
      />
    );
    expect(screen.getByDisplayValue('All Levels')).toBeInTheDocument();
    
    rerender(
      <ExerciseFilter
        difficulty="advanced"
        onDifficultyChange={mockOnDifficultyChange}
      />
    );
    expect(screen.getByDisplayValue('Advanced')).toBeInTheDocument();
  });

  test('renders clear filters button when filters are active', () => {
    render(
      <ExerciseFilter
        category="strength"
        difficulty="all"
        muscleGroup="all"
        onClearFilters={mockOnClearFilters}
      />
    );
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  test('calls onClearFilters when clear button is clicked', () => {
    render(
      <ExerciseFilter
        category="strength"
        difficulty="all"
        muscleGroup="all"
        onClearFilters={mockOnClearFilters}
      />
    );
    fireEvent.click(screen.getByText('Clear Filters'));
    
    expect(mockOnClearFilters).toHaveBeenCalled();
  });

  test('displays all category options', () => {
    render(
      <ExerciseFilter
        category="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );
    const categorySelect = screen.getByDisplayValue('All Categories');
    
    expect(categorySelect).toHaveLength(5); // All + 4 categories
  });

  test('displays all difficulty options', () => {
    render(
      <ExerciseFilter
        difficulty="all"
        onDifficultyChange={mockOnDifficultyChange}
      />
    );
    const difficultySelect = screen.getByDisplayValue('All Levels');
    
    expect(difficultySelect).toHaveLength(4); // All + 3 levels
  });

  test('calls onMuscleGroupChange when muscle group changes', () => {
    render(
      <ExerciseFilter
        muscleGroup="all"
        onMuscleGroupChange={mockOnMuscleGroupChange}
      />
    );
    
    const muscleSelect = screen.getByDisplayValue('All Muscle Groups');
    fireEvent.change(muscleSelect, { target: { value: 'chest' } });
    
    expect(mockOnMuscleGroupChange).toHaveBeenCalledWith('chest');
  });
});
