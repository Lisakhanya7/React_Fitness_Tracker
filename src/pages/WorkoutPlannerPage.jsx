import { useState, useEffect } from 'react';
import styles from './Pages.module.css';
import { Header } from '../components/common/HeaderFooter';
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner';
import exercisesData from '../data/exercisesData';

// WorkoutPlannerPage - create and manage weekly workout plans
const WorkoutPlannerPage = () => {
  const [workoutPlan, setWorkoutPlan] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  // Load workout plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('workoutPlan');
    if (savedPlan) {
      try {
        setWorkoutPlan(JSON.parse(savedPlan));
      } catch (e) {
        console.error('Error loading workout plan:', e);
      }
    }
  }, []);

  // Save workout plan to localStorage
  const handleSavePlan = (updatedPlan) => {
    setWorkoutPlan(updatedPlan);
    localStorage.setItem('workoutPlan', JSON.stringify(updatedPlan));
  };

  return (
    <div className={styles.plannerPage}>
      <Header
        title="Workout Planner"
        subtitle="Build your perfect weekly workout schedule"
      />

      <section className={styles.pageContainer}>
        <WorkoutPlanner
          workoutPlan={workoutPlan}
          allExercises={exercisesData}
          onSavePlan={handleSavePlan}
        />
      </section>
    </div>
  );
};

export default WorkoutPlannerPage;
