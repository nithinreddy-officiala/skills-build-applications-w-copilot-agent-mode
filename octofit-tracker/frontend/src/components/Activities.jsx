import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/activities/`;
  }
  return '/api/activities/';
}

function normalizeActivities(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(getApiBaseUrl());
        const data = await response.json();
        setActivities(normalizeActivities(data));
      } catch (err) {
        setError('Unable to load activities.');
      }
    }

    loadActivities();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id} className="list-group-item">
            <strong>{activity.type}</strong>
            <div className="text-muted">{activity.durationMinutes} min • {activity.distanceKm} km</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
