import { useState, useEffect } from 'react';
import styles from './Pages.module.css';
import { Header } from '../components/common/HeaderFooter';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { AudioPlayer } from '../components/Media/MediaPlayers';
import { Link } from 'react-router-dom';

// Home page - landing page with overview and motivational content
const Home = () => {
  const [todayWorkout, setTodayWorkout] = useState(null);

  useEffect(() => {
    // Load today's workout from localStorage
    const workoutPlan = JSON.parse(localStorage.getItem('workoutPlan') || '{}');
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    setTodayWorkout(workoutPlan[today] || []);
  }, []);

  const features = [
    {
      id: 1,
      icon: '💪',
      title: 'Track Exercises',
      description: 'Browse and log exercises from our comprehensive database',
    },
    {
      id: 2,
      icon: '📋',
      title: 'Plan Workouts',
      description: 'Create weekly workout plans tailored to your goals',
    },
    {
      id: 3,
      icon: '📹',
      title: 'Watch Demos',
      description: 'Learn proper form with exercise demonstration videos',
    },
    {
      id: 4,
      icon: '🎵',
      title: 'Motivation',
      description: 'Listen to motivational audio tracks during workouts',
    },
    {
      id: 5,
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your fitness journey over time',
    },
    {
      id: 6,
      icon: '🎯',
      title: 'Achieve Goals',
      description: 'Stay consistent and reach your fitness targets',
    },
  ];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <Header
        title="Welcome to FitTracker"
        subtitle="Your Personal Fitness Companion - Track. Plan. Achieve."
      />

      {/* Today's Workout Section */}
      <section className={styles.todaySection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Today's Workout</h2>
          {todayWorkout && todayWorkout.length > 0 ? (
            <Card className={styles.todayCard}>
              <div className={styles.workoutList}>
                {todayWorkout.map((exercise, index) => (
                  <div key={index} className={styles.workoutItem}>
                    <span className={styles.workoutName}>{exercise.name}</span>
                    <span className={styles.workoutSets}>
                      {exercise.sets} × {exercise.reps}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/history">
                <Button variant="primary" className={styles.logButton}>
                  Log Today's Workout
                </Button>
              </Link>
            </Card>
          ) : (
            <Card className={styles.todayCard}>
              <p className={styles.noWorkout}>
                No workout planned for today. Would you like to plan one?
              </p>
              <Link to="/workout-planner">
                <Button variant="primary">Plan a Workout</Button>
              </Link>
            </Card>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <Card key={feature.id} className={styles.featureCard} hover={true}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className={styles.motivationSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Workout Motivation</h2>
          <AudioPlayer
            audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            title="Motivational Workout Mix"
            artist="FitTracker"
            description="Energize yourself with this motivational audio track designed to keep you pumped during your workouts!"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaText}>
              Explore our exercise library, create your first workout plan, and start your fitness journey today!
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/exercises">
                <Button variant="primary" size="large">
                  Browse Exercises
                </Button>
              </Link>
              <Link to="/workout-planner">
                <Button variant="secondary" size="large">
                  Create Workout Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
