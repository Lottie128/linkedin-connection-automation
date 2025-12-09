import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [titles, setTitles] = useState('Dean, HR Head, Innovation Manager');
  const [locations, setLocations] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Starting blitz...');
    try {
      const res = await axios.post('/api/start-blitz', {
        email,
        password,
        target: {
          titles: titles.split(',').map(t => t.trim()).filter(Boolean),
          locations: locations.split(',').map(l => l.trim()).filter(Boolean)
        }
      });
      setStatus(`Started: ${JSON.stringify(res.data)}`);
    } catch (err) {
      setStatus(err.response?.data?.detail || 'Error starting blitz');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>LinkedIn Blitz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Target Titles (comma separated)</label><br />
          <input type="text" value={titles} onChange={e => setTitles(e.target.value)} />
        </div>
        <div>
          <label>Locations (optional, comma separated)</label><br />
          <input type="text" value={locations} onChange={e => setLocations(e.target.value)} />
        </div>
        <button type="submit">Start Blitz</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
