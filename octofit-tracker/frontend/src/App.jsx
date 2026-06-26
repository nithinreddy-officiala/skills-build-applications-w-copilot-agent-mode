import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                Multi-tier fitness tracking with activity logs, teams, workouts, and a leaderboard.
              </p>
              <nav className="nav nav-pills flex-wrap mb-4">
                <NavLink className="nav-link" to="/users">Users</NavLink>
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </nav>
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="*" element={<Users />} />
              </Routes>
              <div className="mt-4 small text-muted">
                Define VITE_CODESPACE_NAME in .env.local to use Codespaces API URLs such as https://&lt;name&gt;-8000.app.github.dev/api/.... If it is unset, the app falls back to local API routes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
