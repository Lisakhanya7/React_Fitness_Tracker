import PropTypes from 'prop-types';
import styles from './Exercise.module.css';
import { Modal } from '../UI/MoreUI';
import Button from '../UI/Button';
import { Badge } from '../UI/MoreUI';

// ExerciseDetail component - shows full exercise information
const ExerciseDetail = ({
  exercise,
  onClose,
  onAddToWorkout,
  isInPlan = false,
  ...props
}) => {
  if (!exercise) return null;

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
    <Modal
      isOpen={true}
      onClose={onClose}
      title={exercise.name}
      {...props}
    >
      <div className={styles.detailContent}>
        {/* Exercise Image */}
        <img
          src={exercise.image}
          alt={exercise.name}
          className={styles.detailImage}
        />

        {/* Video Section */}
        {exercise.videoUrl && (
          <div className={styles.videoSection}>
            <h3>Video Demonstration</h3>
            <div className={styles.videoContainer}>
              <iframe
                width="100%"
                height="300"
                src={exercise.videoUrl.replace('youtube.com', 'youtube-nocookie.com')}
                title={`${exercise.name} Tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.videoFrame}
              ></iframe>
            </div>
          </div>
        )}

        {/* Exercise Info */}
        <div className={styles.infoSection}>
          <div className={styles.infoBadges}>
            <Badge variant={getDifficultyColor(exercise.difficulty)}>
              {exercise.difficulty}
            </Badge>
            <Badge variant="primary">{exercise.category}</Badge>
            <Badge variant="default">{exercise.equipment || 'no equipment'}</Badge>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <strong>Recommended:</strong>
              <p>{exercise.sets} sets × {exercise.reps} reps</p>
            </div>
            <div className={styles.statItem}>
              <strong>Duration:</strong>
              <p>{exercise.duration} minutes</p>
            </div>
            <div className={styles.statItem}>
              <strong>Calories/Set:</strong>
              <p>🔥 {exercise.caloriesBurn} calories</p>
            </div>
          </div>

          {/* Muscle Groups */}
          <div className={styles.muscleSection}>
            <h4>Muscle Groups Targeted:</h4>
            <div className={styles.muscleList}>
              {exercise.muscleGroups &&
                exercise.muscleGroups.map((muscle, index) => (
                  <Badge key={index} variant="default">
                    {muscle}
                  </Badge>
                ))}
            </div>
          </div>

          {/* Instructions */}
          {exercise.instructions && exercise.instructions.length > 0 && (
            <div className={styles.instructionsSection}>
              <h4>Proper Form Instructions:</h4>
              <ol className={styles.instructionsList}>
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <Button
            variant="primary"
            size="large"
            onClick={() => onAddToWorkout && onAddToWorkout(exercise)}
          >
            {isInPlan ? '✓ In Workout Plan' : '+ Add to Workout'}
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ExerciseDetail.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    duration: PropTypes.number,
    sets: PropTypes.number,
    reps: PropTypes.number,
    caloriesBurn: PropTypes.number,
    image: PropTypes.string,
    videoUrl: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.string),
    equipment: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onAddToWorkout: PropTypes.func,
  isInPlan: PropTypes.bool,
};

export default ExerciseDetail;
