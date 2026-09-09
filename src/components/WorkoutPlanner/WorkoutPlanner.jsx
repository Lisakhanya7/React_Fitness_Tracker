import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './WorkoutPlanner.module.css';
import DayCard from './DayCard';
import Button from '../UI/Button';
import { Modal } from '../UI/MoreUI';

// WorkoutPlanner component - manage weekly workout plan
const WorkoutPlanner = ({
  workoutPlan = {},
  allExercises = [],
  onSavePlan,
  ...props
}) => {
  const [plan, setPlan] = useState(workoutPlan);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Days of the week
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Update plan when workoutPlan prop changes
  useEffect(() => {
    setPlan(workoutPlan);
  }, [workoutPlan]);

  // Initialize plan if it doesn't exist
  const initializePlan = () => {
    const newPlan = {};
    daysOfWeek.forEach((day) => {
      newPlan[day] = workoutPlan[day] || [];
    });
    setPlan(newPlan);
  };

  useEffect(() => {
    initializePlan();
  }, []);

  // Add exercise to a day
  const handleAddExercise = () => {
    if (selectedDay && selectedExercise) {
      const isAlreadyAdded = plan[selectedDay].some(
        (ex) => ex.id === selectedExercise.id
      );

      if (!isAlreadyAdded) {
        const updatedPlan = {
          ...plan,
          [selectedDay]: [...plan[selectedDay], selectedExercise],
        };
        setPlan(updatedPlan);
        onSavePlan && onSavePlan(updatedPlan);
      }
      setSelectedDay(null);
      setSelectedExercise(null);
    }
  };

  // Remove exercise from a day
  const handleRemoveExercise = (day, index) => {
    const updatedPlan = {
      ...plan,
      [day]: plan[day].filter((_, i) => i !== index),
    };
    setPlan(updatedPlan);
    onSavePlan && onSavePlan(updatedPlan);
  };

  // Clear all exercises from a day
  const handleClearDay = (day) => {
    const updatedPlan = {
      ...plan,
      [day]: [],
    };
    setPlan(updatedPlan);
    onSavePlan && onSavePlan(updatedPlan);
  };

  // Clear entire week
  const handleClearWeek = () => {
    const newPlan = {};
    daysOfWeek.forEach((day) => {
      newPlan[day] = [];
    });
    setPlan(newPlan);
    onSavePlan && onSavePlan(newPlan);
  };

  // Calculate total weekly stats
  const calculateWeeklyStats = () => {
    let totalExercises = 0;
    let totalCalories = 0;
    let daysWithWorkout = 0;

    daysOfWeek.forEach((day) => {
      if (plan[day] && plan[day].length > 0) {
        totalExercises += plan[day].length;
        daysWithWorkout += 1;
        plan[day].forEach((exercise) => {
          totalCalories += exercise.caloriesBurn * exercise.sets;
        });
      }
    });

    return { totalExercises, totalCalories, daysWithWorkout };
  };

  const stats = calculateWeeklyStats();

  return (
    <div className={styles.workoutPlannerContainer} {...props}>
      <div className={styles.planHeader}>
        <h2 className={styles.planTitle}>Weekly Workout Planner</h2>
        <div className={styles.weeklyStats}>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{stats.daysWithWorkout}</span>
            <span className={styles.statLabel}>Days Planned</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>{stats.totalExercises}</span>
            <span className={styles.statLabel}>Exercises</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statValue}>🔥 {stats.totalCalories}</span>
            <span className={styles.statLabel}>Calories</span>
          </div>
        </div>
      </div>

      {/* Add Exercise Modal */}
      <Modal
        isOpen={selectedDay !== null}
        onClose={() => {
          setSelectedDay(null);
          setSelectedExercise(null);
        }}
        title={`Add Exercise to ${selectedDay && selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}`}
      >
        <div className={styles.exerciseSelector}>
          <select
            value={selectedExercise?.id || ''}
            onChange={(e) => {
              const exerciseId = parseInt(e.target.value);
              const exercise = allExercises.find((ex) => ex.id === exerciseId);
              setSelectedExercise(exercise);
            }}
            className={styles.exerciseSelectInput}
          >
            <option value="">Select an exercise...</option>
            {allExercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.category})
              </option>
            ))}
          </select>

          {selectedExercise && (
            <div className={styles.exercisePreview}>
              <p>
                <strong>{selectedExercise.name}</strong>
              </p>
              <p>{selectedExercise.sets} sets × {selectedExercise.reps} reps</p>
              <p>Difficulty: {selectedExercise.difficulty}</p>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleAddExercise}
            disabled={!selectedExercise}
            className={styles.addExerciseBtn}
          >
            Add Exercise
          </Button>
        </div>
      </Modal>

      {/* Days Grid */}
      <div className={styles.daysGrid}>
        {daysOfWeek.map((day) => (
          <DayCard
            key={day}
            day={day}
            exercises={plan[day] || []}
            onAddExercise={() => setSelectedDay(day)}
            onRemoveExercise={handleRemoveExercise}
            onClearDay={handleClearDay}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <Button
          variant="primary"
          size="large"
          onClick={() => onSavePlan && onSavePlan(plan)}
        >
          Save Workout Plan
        </Button>
        <Button
          variant="danger"
          size="large"
          onClick={handleClearWeek}
          disabled={stats.totalExercises === 0}
        >
          Clear Entire Week
        </Button>
      </div>
    </div>
  );
};

WorkoutPlanner.propTypes = {
  workoutPlan: PropTypes.object,
  allExercises: PropTypes.arrayOf(PropTypes.object),
  onSavePlan: PropTypes.func,
};

export default WorkoutPlanner;
