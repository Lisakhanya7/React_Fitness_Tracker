import PropTypes from 'prop-types';
import styles from './WorkoutPlanner.module.css';
import Button from '../UI/Button';

// DayCard component - represents one day of the week
const DayCard = ({
  day,
  exercises = [],
  onAddExercise,
  onRemoveExercise,
  onClearDay,
  ...props
}) => {
  // Capitalize day name
  const dayName = day.charAt(0).toUpperCase() + day.slice(1);

  // Calculate total calories for the day
  const totalCalories = exercises.reduce(
    (sum, ex) => sum + (ex.caloriesBurn * ex.sets || 0),
    0
  );

  return (
    <div className={styles.dayCard} {...props}>
      <div className={styles.dayHeader}>
        <h3 className={styles.dayName}>{dayName}</h3>
        <div className={styles.dayStats}>
          <span className={styles.exerciseCount}>{exercises.length} exercises</span>
          {exercises.length > 0 && (
            <span className={styles.calorieCount}>🔥 {totalCalories} cal</span>
          )}
        </div>
      </div>

      <div className={styles.dayBody}>
        {exercises.length === 0 ? (
          <p className={styles.emptyMessage}>No exercises planned for {dayName}</p>
        ) : (
          <ul className={styles.exerciseList}>
            {exercises.map((exercise, index) => (
              <li key={index} className={styles.exerciseItem}>
                <div className={styles.exerciseInfo}>
                  <span className={styles.exerciseName}>{exercise.name}</span>
                  <span className={styles.exerciseSets}>
                    {exercise.sets} × {exercise.reps}
                  </span>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => onRemoveExercise && onRemoveExercise(day, index)}
                  title="Remove exercise"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.dayFooter}>
        <Button
          variant="secondary"
          size="small"
          onClick={() => onClearDay && onClearDay(day)}
          disabled={exercises.length === 0}
          className={styles.clearButton}
        >
          Clear Day
        </Button>
      </div>
    </div>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      sets: PropTypes.number,
      reps: PropTypes.number,
      caloriesBurn: PropTypes.number,
    })
  ),
  onAddExercise: PropTypes.func,
  onRemoveExercise: PropTypes.func,
  onClearDay: PropTypes.func,
};

export default DayCard;
