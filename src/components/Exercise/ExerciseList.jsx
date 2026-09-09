import PropTypes from 'prop-types';
import styles from './Exercise.module.css';
import ExerciseCard from './ExerciseCard';
import { Loading } from '../UI/MoreUI';

// ExerciseList component - renders array of exercises
const ExerciseList = ({
  exercises,
  isLoading = false,
  onSelectExercise,
  onAddToWorkout,
  workoutPlan = [],
  error = null,
  ...props
}) => {
  // Check if exercise is in workout plan
  const isExerciseInPlan = (exerciseId) => {
    return workoutPlan.some((e) => e.id === exerciseId);
  };

  // Conditional rendering for different states
  if (isLoading) {
    return <Loading message="Loading exercises..." />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  if (!exercises || exercises.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyMessage}>
          No exercises found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.exerciseListContainer} {...props}>
      <div className={styles.exerciseGrid}>
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onSelect={onSelectExercise}
            onAddToWorkout={onAddToWorkout}
            isInPlan={isExerciseInPlan(exercise.id)}
          />
        ))}
      </div>
    </div>
  );
};

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  onSelectExercise: PropTypes.func,
  onAddToWorkout: PropTypes.func,
  workoutPlan: PropTypes.array,
  error: PropTypes.string,
};

export default ExerciseList;
