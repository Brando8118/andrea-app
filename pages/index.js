import { useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if ((username === 'cliente' || username === 'studio') && password === '1234') {
      setLoggedIn(true);
      setRole(username);
    } else {
      alert('Credenziali errate');
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Studio Legale Mariani</h1>
        <input placeholder="cliente o studio" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Accedi</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Benvenuto nell'area riservata: {role}</h2>
      <p>Caricamento documenti, appuntamenti e videochiamate disponibili nella versione completa.</p>
    </div>
  );
}