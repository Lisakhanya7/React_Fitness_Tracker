import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navigation/Navbar';
import { Footer } from './components/common/HeaderFooter';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import HistoryPage from './pages/HistoryPage';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';

// Main App component - setup routing and layout
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main className="mainContent">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* Exercises page */}
            <Route path="/exercises" element={<ExercisesPage />} />

            {/* Workout planner page */}
            <Route path="/workout-planner" element={<WorkoutPlannerPage />} />

            {/* Workout history page */}
            <Route path="/history" element={<HistoryPage />} />

            {/* Progress tracking page */}
            <Route path="/progress" element={<ProgressPage />} />

            {/* 404 Not Found page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export { default } from './App';
