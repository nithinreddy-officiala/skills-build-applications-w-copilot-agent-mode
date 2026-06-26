import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
  }
  return '/api/leaderboard/';
}

function normalizeLeaderboard(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiBaseUrl());
        const data = await response.json();
        setEntries(normalizeLeaderboard(data));
      } catch (err) {
        setError('Unable to load leaderboard.');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id || entry.username} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">{entry.username}</div>
              <div className="text-muted">Rank {entry.rank}</div>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
