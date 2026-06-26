import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/users/`;
  }
  return '/api/users/';
}

function normalizeUsers(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(getApiBaseUrl());
        const data = await response.json();
        setUsers(normalizeUsers(data));
      } catch (err) {
        setError('Unable to load users.');
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id || user.id || user.username} className="list-group-item">
            <strong>{user.username || 'Unknown user'}</strong>
            <div className="text-muted">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
