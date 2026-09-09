import PropTypes from 'prop-types';
import styles from './Exercise.module.css';
import Button from '../UI/Button';

// ExerciseFilter component - filter exercises by various criteria
const ExerciseFilter = ({
  category = 'all',
  difficulty = 'all',
  muscleGroup = 'all',
  onCategoryChange,
  onDifficultyChange,
  onMuscleGroupChange,
  onClearFilters,
  ...props
}) => {
  // Inline styles for conditional styling
  const filterContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  };

  const filterRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
    flexWrap: 'wrap',
  };

  const selectStyle = {
    flex: 1,
    minWidth: '150px',
    padding: '10px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
  };

  return (
    <div className={styles.filterContainer} style={filterContainerStyle} {...props}>
      <h3 className={styles.filterTitle}>Filter Exercises</h3>

      <div style={filterRowStyle}>
        {/* Category Filter */}
        <div className={styles.filterGroup} style={{ flex: 1 }}>
          <label htmlFor="category-select" className={styles.filterLabel}>
            Category:
          </label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
            style={selectStyle}
            className={`${styles.filterSelect} ${
              category !== 'all' ? styles.activeFilter : ''
            }`}
          >
            <option value="all">All Categories</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flexibility</option>
            <option value="balance">Balance</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className={styles.filterGroup} style={{ flex: 1 }}>
          <label htmlFor="difficulty-select" className={styles.filterLabel}>
            Difficulty:
          </label>
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => onDifficultyChange && onDifficultyChange(e.target.value)}
            style={selectStyle}
            className={`${styles.filterSelect} ${
              difficulty !== 'all' ? styles.activeFilter : ''
            }`}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Muscle Group Filter */}
        <div className={styles.filterGroup} style={{ flex: 1 }}>
          <label htmlFor="muscle-select" className={styles.filterLabel}>
            Muscle Group:
          </label>
          <select
            id="muscle-select"
            value={muscleGroup}
            onChange={(e) => onMuscleGroupChange && onMuscleGroupChange(e.target.value)}
            style={selectStyle}
            className={`${styles.filterSelect} ${
              muscleGroup !== 'all' ? styles.activeFilter : ''
            }`}
          >
            <option value="all">All Muscle Groups</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
            <option value="legs">Legs</option>
            <option value="glutes">Glutes</option>
            <option value="core">Core</option>
            <option value="triceps">Triceps</option>
            <option value="biceps">Biceps</option>
            <option value="quadriceps">Quadriceps</option>
            <option value="hamstrings">Hamstrings</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(category !== 'all' || difficulty !== 'all' || muscleGroup !== 'all') && (
        <Button
          variant="secondary"
          onClick={onClearFilters}
          className={styles.clearFiltersBtn}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

ExerciseFilter.propTypes = {
  category: PropTypes.string,
  difficulty: PropTypes.string,
  muscleGroup: PropTypes.string,
  onCategoryChange: PropTypes.func,
  onDifficultyChange: PropTypes.func,
  onMuscleGroupChange: PropTypes.func,
  onClearFilters: PropTypes.func,
};

export default ExerciseFilter;
