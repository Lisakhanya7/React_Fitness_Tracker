import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navigation/Navbar';
import { Footer } from './components/common/HeaderFooter';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import HistoryPage from './pages/HistoryPage';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/workout-planner" element={<WorkoutPlannerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
