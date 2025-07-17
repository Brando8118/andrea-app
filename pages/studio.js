
import { useState } from "react";

export default function Studio() {
  const [clienti, setClienti] = useState([
    {
      nome: "Mario Rossi",
      appuntamenti: [
        { tipo: "Ortopedico", data: "2025-07-25", ora: "10:30", luogo: "Via Roma 42", medico: "Dr. Bianchi" }
      ],
      documenti: []
    },
    {
      nome: "Luca Verdi",
      appuntamenti: [],
      documenti: []
    }
  ]);

  const [clienteSelezionato, setClienteSelezionato] = useState(clienti[0].nome);
  const [tipoApp, setTipoApp] = useState("Ortopedico");
  const [dataApp, setDataApp] = useState("");
  const [oraApp, setOraApp] = useState("");
  const [luogoApp, setLuogoApp] = useState("");
  const [medicoApp, setMedicoApp] = useState("");

  const aggiungiAppuntamento = () => {
    const aggiornati = clienti.map(c => {
      if (c.nome === clienteSelezionato) {
        return {
          ...c,
          appuntamenti: [...c.appuntamenti, { tipo: tipoApp, data: dataApp, ora: oraApp, luogo: luogoApp, medico: medicoApp }]
        };
      }
      return c;
    });
    setClienti(aggiornati);
  };

  const cliente = clienti.find(c => c.nome === clienteSelezionato);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard Studio - Easy Legal</h1>

      <label>Seleziona Cliente:</label>
      <select value={clienteSelezionato} onChange={(e) => setClienteSelezionato(e.target.value)}>
        {clienti.map(c => <option key={c.nome}>{c.nome}</option>)}
      </select>

      <h2>Appuntamenti di {clienteSelezionato}</h2>
      <ul>
        {cliente.appuntamenti.map((a, i) => (
          <li key={i}>
            [{a.tipo}] {a.data} {a.ora} - {a.luogo} ({a.medico})
          </li>
        ))}
      </ul>

      <h3>Aggiungi Appuntamento</h3>
      <select value={tipoApp} onChange={(e) => setTipoApp(e.target.value)}>
        <option>Ortopedico</option>
        <option>Esami</option>
        <option>Fisioterapia</option>
        <option>Psicologo</option>
      </select><br />
      <input type="date" value={dataApp} onChange={(e) => setDataApp(e.target.value)} /><br />
      <input type="time" value={oraApp} onChange={(e) => setOraApp(e.target.value)} /><br />
      <input placeholder="Luogo" value={luogoApp} onChange={(e) => setLuogoApp(e.target.value)} /><br />
      <input placeholder="Medico" value={medicoApp} onChange={(e) => setMedicoApp(e.target.value)} /><br />
      <button onClick={aggiungiAppuntamento}>Aggiungi</button>
    </div>
  );
}
