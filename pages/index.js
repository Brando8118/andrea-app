import { useState } from "react";

export default function Home() {
  const [logged, setLogged] = useState(false);
  const [utente, setUtente] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if ((utente === "studio" || utente === "cliente") && password === "1234") {
      setLogged(true);
    } else {
      alert("Credenziali non valide");
    }
  };

  if (!logged) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Easy Legal - Login</h1>
        <input placeholder="utente" value={utente} onChange={(e) => setUtente(e.target.value)} /><br />
        <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Benvenuto in Easy Legal</h1>
      <a href="/studio">Vai alla Dashboard Studio</a><br />
      <a href="/cliente">Vai alla Dashboard Cliente</a>
    </div>
  );
}
