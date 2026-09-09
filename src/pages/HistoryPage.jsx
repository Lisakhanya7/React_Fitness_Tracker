import { useState, useEffect } from 'react';
import styles from './Pages.module.css';
import { Header } from '../components/common/HeaderFooter';
import WorkoutLog from '../components/WorkoutLog/WorkoutLog';
import exercisesData from '../data/exercisesData';

// HistoryPage - log and view workout history
const HistoryPage = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  // Load workout history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('workoutHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // Convert date strings back to Date objects
        const withDates = parsed.map((entry) => ({
          ...entry,
          date: new Date(entry.date),
        }));
        setWorkoutHistory(withDates);
      } catch (e) {
        console.error('Error loading workout history:', e);
      }
    }
  }, []);

  // Add new workout entry
  const handleAddWorkout = (newEntry) => {
    const updatedHistory = [newEntry, ...workoutHistory];
    setWorkoutHistory(updatedHistory);
    localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
  };

  // Delete workout entry
  const handleDeleteWorkout = (entryId) => {
    const updatedHistory = workoutHistory.filter((entry) => entry.id !== entryId);
    setWorkoutHistory(updatedHistory);
    localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className={styles.historyPage}>
      <Header
        title="Workout History"
        subtitle="Log your completed workouts and track your progress"
      />

      <section className={styles.pageContainer}>
        <WorkoutLog
          workoutHistory={workoutHistory}
          allExercises={exercisesData}
          onAddWorkout={handleAddWorkout}
          onDeleteWorkout={handleDeleteWorkout}
        />
      </section>
    </div>
  );
};

export default HistoryPage;
