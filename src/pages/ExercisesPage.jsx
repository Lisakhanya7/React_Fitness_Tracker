import { useState, useEffect } from 'react';
import styles from './Pages.module.css';
import { Header } from '../components/common/HeaderFooter';
import SearchBar from '../components/UI/SearchBar';
import ExerciseList from '../components/Exercise/ExerciseList';
import ExerciseFilter from '../components/Exercise/ExerciseFilter';
import ExerciseDetail from '../components/Exercise/ExerciseDetail';
import exercisesData from '../data/exercisesData';

// ExercisesPage - browse and search exercises
const ExercisesPage = () => {
  const [exercises, setExercises] = useState(exercisesData);
  const [filteredExercises, setFilteredExercises] = useState(exercisesData);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [workoutPlan, setWorkoutPlan] = useState([]);

  // Load workout plan from localStorage
  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem('workoutPlan') || '{}');
    const allExercisesInPlan = Object.values(savedPlan).flat();
    setWorkoutPlan(allExercisesInPlan);
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    filterExercises();
  }, [searchTerm, category, difficulty, muscleGroup, exercises]);

  // Filter exercises based on all criteria
  const filterExercises = () => {
    let result = exercises;

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (ex) =>
          ex.name.toLowerCase().includes(term) ||
          ex.category.toLowerCase().includes(term) ||
          ex.muscleGroups.some((m) => m.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (category !== 'all') {
      result = result.filter((ex) => ex.category === category);
    }

    // Difficulty filter
    if (difficulty !== 'all') {
      result = result.filter((ex) => ex.difficulty === difficulty);
    }

    // Muscle group filter
    if (muscleGroup !== 'all') {
      result = result.filter((ex) =>
        ex.muscleGroups.includes(muscleGroup)
      );
    }

    setFilteredExercises(result);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setDifficulty('all');
    setMuscleGroup('all');
  };

  // Handle adding exercise to workout plan
  const handleAddToWorkout = (exercise) => {
    const savedPlan = JSON.parse(localStorage.getItem('workoutPlan') || '{}');
    
    // Add to first available day (or you could show a modal to select day)
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let added = false;

    for (const day of daysOfWeek) {
      if (!savedPlan[day]) {
        savedPlan[day] = [];
      }
      // Only add if not already in this day
      if (!savedPlan[day].some((e) => e.id === exercise.id)) {
        savedPlan[day].push(exercise);
        added = true;
        break;
      }
    }

    if (added) {
      localStorage.setItem('workoutPlan', JSON.stringify(savedPlan));
      const allExercisesInPlan = Object.values(savedPlan).flat();
      setWorkoutPlan(allExercisesInPlan);
      alert(`${exercise.name} added to your workout plan!`);
    } else {
      alert(`${exercise.name} is already in your workout plan!`);
    }
  };

  // Handle selecting exercise to view details
  const handleSelectExercise = (exerciseId) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    setSelectedExercise(exercise);
  };

  return (
    <div className={styles.exercisesPage}>
      <Header
        title="Browse Exercises"
        subtitle="Explore our comprehensive exercise library and find the perfect workout for you"
      />

      <section className={styles.pageContainer}>
        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onClear={() => setSearchTerm('')}
          placeholder="Search exercises by name, category, or muscle group..."
        />

        {/* Filters */}
        <ExerciseFilter
          category={category}
          difficulty={difficulty}
          muscleGroup={muscleGroup}
          onCategoryChange={setCategory}
          onDifficultyChange={setDifficulty}
          onMuscleGroupChange={setMuscleGroup}
          onClearFilters={handleClearFilters}
        />

        {/* Results Info */}
        <div className={styles.resultsInfo}>
          <p>
            Found <strong>{filteredExercises.length}</strong> exercise{filteredExercises.length !== 1 ? 's' : ''} matching your criteria
          </p>
        </div>

        {/* Exercise List */}
        <ExerciseList
          exercises={filteredExercises}
          onSelectExercise={handleSelectExercise}
          onAddToWorkout={handleAddToWorkout}
          workoutPlan={workoutPlan}
        />
      </section>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetail
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onAddToWorkout={handleAddToWorkout}
          isInPlan={workoutPlan.some((e) => e.id === selectedExercise.id)}
        />
      )}
    </div>
  );
};

export default ExercisesPage;
