import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CulturalClubs from './pages/CulturalClubs';
import TechnicalClubs from './pages/TechnicalClubs';
import SportsCommittee from './pages/SportsCommittee';
import ClubDetails from './pages/ClubDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cultural" element={<CulturalClubs />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />
        <Route path="/technical" element={<TechnicalClubs />} />
        <Route path="/sports" element={<SportsCommittee />} />
      </Routes>
    </Router>
  )
}

export default App

