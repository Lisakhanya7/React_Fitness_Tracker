import PropTypes from 'prop-types';
import styles from './WorkoutLog.module.css';
import Button from '../UI/Button';

// LogEntry component - individual workout log entry
const LogEntry = ({
  entry,
  onDelete,
  exerciseName,
  ...props
}) => {
  const formatDate = (date) => {
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  };

  const formattedDate = formatDate(entry.date);

  // Inline styles for conditional styling
  const difficultyStyle =
    entry.difficulty === 'beginner'
      ? { color: '#28a745' }
      : entry.difficulty === 'intermediate'
      ? { color: '#007bff' }
      : { color: '#dc3545' };

  return (
    <div className={styles.logEntry} {...props}>
      <div className={styles.entryHeader}>
        <div className={styles.entryInfo}>
          <h4 className={styles.entryExercise}>{exerciseName}</h4>
          <p className={styles.entryDate}>📅 {formattedDate}</p>
        </div>
        {onDelete && (
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(entry.id)}
            title="Delete log entry"
          >
            🗑️
          </button>
        )}
      </div>

      <div className={styles.entryDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Sets</span>
          <span className={styles.detailValue}>{entry.sets}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Reps</span>
          <span className={styles.detailValue}>{entry.reps}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Weight</span>
          <span className={styles.detailValue}>
            {entry.weight || 'N/A'} {entry.weight ? 'lbs' : ''}
          </span>
        </div>
        {entry.difficulty && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Difficulty</span>
            <span className={styles.detailValue} style={difficultyStyle}>
              {entry.difficulty}
            </span>
          </div>
        )}
      </div>

      {entry.notes && (
        <div className={styles.entryNotes}>
          <p className={styles.notesText}>{entry.notes}</p>
        </div>
      )}
    </div>
  );
};

LogEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    sets: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    weight: PropTypes.number,
    notes: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  exerciseName: PropTypes.string.isRequired,
};

export default LogEntry;
