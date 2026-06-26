import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/teams/`;
  }
  return '/api/teams/';
}

function normalizeTeams(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiBaseUrl());
        const data = await response.json();
        setTeams(normalizeTeams(data));
      } catch (err) {
        setError('Unable to load teams.');
      }
    }

    loadTeams();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.id || team.name} className="list-group-item">
            <strong>{team.name}</strong>
            <div className="text-muted">{team.sport} • {team.city}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
