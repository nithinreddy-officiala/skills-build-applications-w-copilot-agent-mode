import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
  }
  return '/api/workouts/';
}

function normalizeWorkouts(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getApiBaseUrl());
        const data = await response.json();
        setWorkouts(normalizeWorkouts(data));
      } catch (err) {
        setError('Unable to load workouts.');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id || workout.title} className="list-group-item">
            <strong>{workout.title}</strong>
            <div className="text-muted">{workout.category} • {workout.durationMinutes} min</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
