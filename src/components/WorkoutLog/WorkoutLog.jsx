import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './WorkoutLog.module.css';
import LogEntry from './LogEntry';
import Button from '../UI/Button';
import { Modal, Loading } from '../UI/MoreUI';

// WorkoutLog component - log completed workouts
const WorkoutLog = ({
  workoutHistory = [],
  allExercises = [],
  onAddWorkout,
  onDeleteWorkout,
  isLoading = false,
  ...props
}) => {
  const [history, setHistory] = useState(workoutHistory);
  const [showLogForm, setShowLogForm] = useState(false);
  const [formData, setFormData] = useState({
    exerciseId: '',
    date: new Date().toISOString().split('T')[0],
    sets: 3,
    reps: 10,
    weight: '',
    notes: '',
  });

  useEffect(() => {
    setHistory(workoutHistory);
  }, [workoutHistory]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sets' || name === 'reps' ? parseInt(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.exerciseId) {
      alert('Please select an exercise');
      return;
    }

    const selectedExercise = allExercises.find(
      (ex) => ex.id === parseInt(formData.exerciseId)
    );

    const newEntry = {
      id: Date.now().toString(),
      exerciseId: parseInt(formData.exerciseId),
      exerciseName: selectedExercise?.name,
      date: new Date(formData.date),
      sets: formData.sets,
      reps: formData.reps,
      weight: formData.weight ? parseInt(formData.weight) : null,
      notes: formData.notes,
      difficulty: selectedExercise?.difficulty,
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    onAddWorkout && onAddWorkout(newEntry);

    // Reset form
    setFormData({
      exerciseId: '',
      date: new Date().toISOString().split('T')[0],
      sets: 3,
      reps: 10,
      weight: '',
      notes: '',
    });
    setShowLogForm(false);
  };

  // Handle delete workout
  const handleDeleteWorkout = (entryId) => {
    const updatedHistory = history.filter((entry) => entry.id !== entryId);
    setHistory(updatedHistory);
    onDeleteWorkout && onDeleteWorkout(entryId);
  };

  // Calculate statistics
  const calculateStats = () => {
    let totalWorkouts = history.length;
    let totalSets = 0;
    let totalReps = 0;
    let totalWeight = 0;

    history.forEach((entry) => {
      totalSets += entry.sets;
      totalReps += entry.reps;
      if (entry.weight) {
        totalWeight += entry.weight * entry.sets;
      }
    });

    return { totalWorkouts, totalSets, totalReps, totalWeight };
  };

  const stats = calculateStats();

  if (isLoading) {
    return <Loading message="Loading workout history..." />;
  }

  return (
    <div className={styles.workoutLogContainer} {...props}>
      <div className={styles.logHeader}>
        <h2 className={styles.logTitle}>Workout History & Logging</h2>
        <Button
          variant="primary"
          onClick={() => setShowLogForm(true)}
        >
          + Log Workout
        </Button>
      </div>

      {/* Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.totalWorkouts}</span>
          <span className={styles.statName}>Workouts Logged</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.totalSets}</span>
          <span className={styles.statName}>Total Sets</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.totalReps}</span>
          <span className={styles.statName}>Total Reps</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.totalWeight}</span>
          <span className={styles.statName}>Total Weight (lbs)</span>
        </div>
      </div>

      {/* Log Form Modal */}
      <Modal
        isOpen={showLogForm}
        onClose={() => setShowLogForm(false)}
        title="Log a Workout"
      >
        <form onSubmit={handleSubmit} className={styles.logForm}>
          <div className={styles.formGroup}>
            <label htmlFor="exercise-select">Exercise *</label>
            <select
              id="exercise-select"
              name="exerciseId"
              value={formData.exerciseId}
              onChange={handleInputChange}
              required
              className={styles.formInput}
            >
              <option value="">Select an exercise...</option>
              {allExercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name} ({exercise.category})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="date-input">Date *</label>
              <input
                id="date-input"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sets-input">Sets *</label>
              <input
                id="sets-input"
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleInputChange}
                min="1"
                max="100"
                required
                className={styles.formInput}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="reps-input">Reps *</label>
              <input
                id="reps-input"
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleInputChange}
                min="1"
                max="100"
                required
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="weight-input">Weight (lbs)</label>
              <input
                id="weight-input"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                min="0"
                step="0.5"
                className={styles.formInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes-input">Notes</label>
            <textarea
              id="notes-input"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="How did the workout feel? Any observations?"
              className={styles.formTextarea}
              rows="3"
            ></textarea>
          </div>

          <div className={styles.formActions}>
            <Button
              variant="primary"
              type="submit"
            >
              Log Workout
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowLogForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Workout History */}
      <div className={styles.historySection}>
        <h3 className={styles.historyTitle}>Recent Workouts</h3>
        {history.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No workouts logged yet. Start tracking your progress!</p>
          </div>
        ) : (
          <div className={styles.entriesList}>
            {history.map((entry) => (
              <LogEntry
                key={entry.id}
                entry={entry}
                exerciseName={entry.exerciseName}
                onDelete={handleDeleteWorkout}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

WorkoutLog.propTypes = {
  workoutHistory: PropTypes.arrayOf(PropTypes.object),
  allExercises: PropTypes.arrayOf(PropTypes.object),
  onAddWorkout: PropTypes.func,
  onDeleteWorkout: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default WorkoutLog;
