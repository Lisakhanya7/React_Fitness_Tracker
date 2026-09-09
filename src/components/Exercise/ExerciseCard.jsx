import PropTypes from 'prop-types';
import styles from './Exercise.module.css';
import Card from '../UI/Card';
import { Badge } from '../UI/MoreUI';

// ExerciseCard component - displays exercise summary
const ExerciseCard = ({
  exercise,
  onSelect,
  onAddToWorkout,
  isInPlan = false,
  ...props
}) => {
  // Determine difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'primary';
      case 'advanced':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <Card
      className={styles.exerciseCard}
      onClick={() => onSelect && onSelect(exercise.id)}
      hover={true}
      {...props}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.exerciseName}>{exercise.name}</h3>
        <Badge variant={getDifficultyColor(exercise.difficulty)}>
          {exercise.difficulty}
        </Badge>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.category}>
          <strong>Category:</strong> {exercise.category}
        </p>
        <p className={styles.muscleGroups}>
          <strong>Muscles:</strong> {exercise.muscleGroups.join(', ')}
        </p>
        <p className={styles.sets}>
          {exercise.sets} sets × {exercise.reps} reps
        </p>
        <p className={styles.calories}>
          🔥 {exercise.caloriesBurn} calories/set
        </p>
      </div>

      {onAddToWorkout && (
        <button
          className={`${styles.addButton} ${isInPlan ? styles.inPlan : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToWorkout(exercise);
          }}
        >
          {isInPlan ? '✓ In Plan' : '+ Add to Workout'}
        </button>
      )}
    </Card>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
    caloriesBurn: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func,
  onAddToWorkout: PropTypes.func,
  isInPlan: PropTypes.bool,
};

export default ExerciseCard;
