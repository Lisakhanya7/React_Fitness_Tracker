import { useState, useEffect } from 'react';
import styles from './Pages.module.css';
import { Header } from '../components/common/HeaderFooter';
import Card from '../components/UI/Card';

// ProgressPage - track fitness progress and statistics
const ProgressPage = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalExercises: 0,
    currentStreak: 0,
    totalCalories: 0,
    totalSets: 0,
    totalReps: 0,
    totalWeight: 0,
    favoriteExercise: null,
  });

  // Load and calculate statistics from localStorage
  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    // Get workout history
    const historyData = localStorage.getItem('workoutHistory');
    const history = historyData ? JSON.parse(historyData) : [];

    // Get workout plan
    const planData = localStorage.getItem('workoutPlan');
    const plan = planData ? JSON.parse(planData) : {};

    // Calculate total exercises in current plan
    let totalExercisesInPlan = 0;
    Object.values(plan).forEach((dayExercises) => {
      totalExercisesInPlan += dayExercises.length;
    });

    // Calculate statistics from history
    let totalWorkouts = history.length;
    let totalCalories = 0;
    let totalSets = 0;
    let totalReps = 0;
    let totalWeight = 0;
    let exerciseCounts = {};
    let favoriteExercise = null;
    let maxCount = 0;

    history.forEach((entry) => {
      totalSets += entry.sets;
      totalReps += entry.reps;
      if (entry.weight) {
        totalWeight += entry.weight * entry.sets;
      }

      // Count exercise frequency
      if (!exerciseCounts[entry.exerciseName]) {
        exerciseCounts[entry.exerciseName] = 0;
      }
      exerciseCounts[entry.exerciseName]++;

      if (exerciseCounts[entry.exerciseName] > maxCount) {
        maxCount = exerciseCounts[entry.exerciseName];
        favoriteExercise = entry.exerciseName;
      }
    });

    // Calculate workout streak
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);

    const workoutDates = history.map((entry) => {
      const d = new Date(entry.date);
      return d.toDateString();
    });

    while (true) {
      if (workoutDates.includes(checkDate.toDateString())) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    setStats({
      totalWorkouts,
      totalExercises: totalExercisesInPlan,
      currentStreak: streak,
      totalCalories,
      totalSets,
      totalReps,
      totalWeight,
      favoriteExercise,
    });
  };

  return (
    <div className={styles.progressPage}>
      <Header
        title="Your Progress"
        subtitle="Monitor your fitness journey and celebrate your achievements"
      />

      <section className={styles.pageContainer}>
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statIcon}>💪</span>
              <div className={styles.statInfo}>
                <h3 className={styles.statLabel}>Workouts Logged</h3>
                <p className={styles.statValue}>{stats.totalWorkouts}</p>
              </div>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statIcon}>📋</span>
              <div className={styles.statInfo}>
                <h3 className={styles.statLabel}>Exercises Planned</h3>
                <p className={styles.statValue}>{stats.totalExercises}</p>
              </div>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statIcon}>🔥</span>
              <div className={styles.statInfo}>
                <h3 className={styles.statLabel}>Current Streak</h3>
                <p className={styles.statValue}>{stats.currentStreak} days</p>
              </div>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <span className={styles.statIcon}>⚖️</span>
              <div className={styles.statInfo}>
                <h3 className={styles.statLabel}>Total Weight Lifted</h3>
                <p className={styles.statValue}>{stats.totalWeight} lbs</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className={styles.detailedStats}>
          <Card className={styles.detailedCard}>
            <h2 className={styles.cardTitle}>Workout Summary</h2>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Sets</span>
                <span className={styles.summaryValue}>{stats.totalSets}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Reps</span>
                <span className={styles.summaryValue}>{stats.totalReps}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Favorite Exercise</span>
                <span className={styles.summaryValue}>
                  {stats.favoriteExercise || 'N/A'}
                </span>
              </div>
            </div>
          </Card>

          <Card className={styles.detailedCard}>
            <h2 className={styles.cardTitle}>Tips to Stay Motivated</h2>
            <ul className={styles.tipsList}>
              <li>🎯 Set clear fitness goals and track your progress</li>
              <li>📅 Schedule your workouts consistently</li>
              <li>🎵 Listen to motivational music during workouts</li>
              <li>📸 Take progress photos to visualize changes</li>
              <li>👥 Find a workout buddy for accountability</li>
              <li>🎉 Celebrate your achievements, no matter how small</li>
              <li>💧 Stay hydrated and get proper nutrition</li>
              <li>😴 Prioritize rest and recovery</li>
            </ul>
          </Card>
        </div>

        {/* Progress Insights */}
        <Card className={styles.insightsCard}>
          <h2 className={styles.cardTitle}>Your Progress Insights</h2>
          <div className={styles.insightsContent}>
            {stats.totalWorkouts === 0 ? (
              <p>Start logging workouts to see your progress insights!</p>
            ) : (
              <>
                <p>
                  🎉 You've logged <strong>{stats.totalWorkouts} workouts</strong> so far. Keep it up!
                </p>
                {stats.currentStreak > 0 && (
                  <p>
                    🔥 You have a <strong>{stats.currentStreak}-day streak</strong>. Don't break it!
                  </p>
                )}
                {stats.favoriteExercise && (
                  <p>
                    💪 Your favorite exercise is <strong>{stats.favoriteExercise}</strong>.
                  </p>
                )}
                {stats.totalWeight > 0 && (
                  <p>
                    ⚖️ You've lifted a total of <strong>{stats.totalWeight} lbs</strong>. That's impressive!
                  </p>
                )}
              </>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ProgressPage;
