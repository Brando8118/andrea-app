
// App completa con notifiche, backend simulato, gestione documenti e videochiamata
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ClienteDashboard() {
  const router = useRouter();
  const [utente, setUtente] = useState("cliente");
  const [clienteAttivo, setClienteAttivo] = useState("Mario Rossi");
  const [clienti] = useState(["Mario Rossi", "Luca Verdi", "Giulia Bianchi"]);
  const [datiClienti, setDatiClienti] = useState({
    "Mario Rossi": { documenti: [], appuntamenti: [{ data: "2025-07-25", orario: "10:30", luogo: "Via Roma 42", medico: "Dr. Bianchi" }], messaggi: [] },
    "Luca Verdi": { documenti: [], appuntamenti: [], messaggi: [] },
    "Giulia Bianchi": { documenti: [], appuntamenti: [], messaggi: [] }
  });

  const [documento, setDocumento] = useState(null);
  const [note, setNote] = useState("");
  const [utenteLogin, setUtenteLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loggato, setLoggato] = useState(false);

  useEffect(() => {
    if (!loggato) return;
    const now = new Date();
    const appuntamenti = datiClienti[clienteAttivo]?.appuntamenti || [];
    appuntamenti.forEach(app => {
      const appData = new Date(`${app.data}T${app.orario}`);
      const diffMinuti = (appData - now) / 1000 / 60;
      if (diffMinuti > 0 && diffMinuti < 1440) {
        alert(`🔔 Promemoria: visita domani alle ${app.orario} con ${app.medico}`);
      }
    });
  }, [loggato, clienteAttivo, datiClienti]);

  const caricaDocumento = () => {
    if (documento) {
      const aggiorna = { ...datiClienti };
      aggiorna[clienteAttivo].documenti.push({ file: documento, note });
      setDatiClienti(aggiorna);
      setDocumento(null);
      setNote("");
      alert("✅ Documento caricato con successo!");
    } else {
      alert("❌ Seleziona un file da caricare.");
    }
  };

  const eliminaDocumento = (index) => {
    const aggiornati = { ...datiClienti };
    aggiornati[clienteAttivo].documenti.splice(index, 1);
    setDatiClienti(aggiornati);
    alert("🗑️ Documento eliminato.");
  };

  const login = () => {
    if ((utenteLogin === "cliente" || utenteLogin === "studio") && passwordLogin === "1234") {
      setUtente(utenteLogin);
      setLoggato(true);
      alert(`🔓 Accesso effettuato come ${utenteLogin}`);
    } else {
      alert("❌ Credenziali non valide");
    }
  };

  if (!loggato) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="w-full max-w-sm p-6 space-y-4 bg-white rounded shadow">
          <div className="text-center mb-4">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">LOGO</div>
            <h1 className="text-xl font-bold">Accesso Area Riservata</h1>
          </div>
          <input placeholder="cliente o studio" value={utenteLogin} onChange={(e) => setUtenteLogin(e.target.value)} className="w-full p-2 border rounded mb-2" />
          <input placeholder="password" type="password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} className="w-full p-2 border rounded mb-4" />
          <button onClick={login} className="w-full bg-blue-600 text-white py-2 rounded">Accedi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-700 text-white px-6 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">M</div>
          <h1 className="text-xl font-bold">Studio Infortunistica Mariani</h1>
        </div>
        <p className="text-sm">Accesso: {utente}</p>
      </header>

      <main className="flex-1 overflow-auto p-4 sm:p-6">
        {utente === "studio" && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Gestisci cliente:</label>
            <select
              value={clienteAttivo}
              onChange={(e) => setClienteAttivo(e.target.value)}
              className="p-2 rounded border"
            >
              {clienti.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-6">
          <div className="mb-4 flex gap-2">
            <button onClick={() => router.push("#documenti")} className="px-4 py-2 bg-blue-500 text-white rounded">📤 Documenti</button>
            <button onClick={() => router.push("#video")} className="px-4 py-2 bg-blue-500 text-white rounded">📹 Videochiamata</button>
            <button onClick={() => router.push("#appuntamenti")} className="px-4 py-2 bg-blue-500 text-white rounded">📆 Appuntamenti</button>
          </div>

          <section id="documenti">
            <div className="bg-white p-4 rounded shadow mb-6">
              <h2 className="text-lg font-semibold mb-2">Carica Documento per {clienteAttivo}</h2>
              <input type="file" onChange={(e) => setDocumento(e.target.files[0])} className="mb-2" />
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note per lo studio" className="mb-2 p-2 border rounded w-full" />
              <button onClick={caricaDocumento} className="bg-green-600 text-white px-4 py-2 rounded">Carica</button>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Documenti Caricati di {clienteAttivo}</h2>
              {datiClienti[clienteAttivo].documenti.length === 0 ? (
                <p className="text-gray-500 italic">Nessun documento caricato.</p>
              ) : (
                datiClienti[clienteAttivo].documenti.map((doc, i) => (
                  <div key={i} className="border p-3 rounded mb-2">
                    <p><strong>📎 Nome File:</strong> {doc.file.name}</p>
                    <p><strong>📝 Note:</strong> {doc.note}</p>
                    <button onClick={() => eliminaDocumento(i)} className="mt-2 text-red-600 hover:underline text-sm">🗑️ Elimina</button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section id="appuntamenti" className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Appuntamenti programmati</h2>
            {datiClienti[clienteAttivo].appuntamenti.length === 0 ? (
              <p className="text-gray-500 italic">Nessun appuntamento disponibile.</p>
            ) : (
              <div className="space-y-2">
                {datiClienti[clienteAttivo].appuntamenti.map((app, i) => (
                  <div key={i} className="bg-white p-4 rounded shadow border-l-4 border-blue-600">
                    <p><strong>📅 Data:</strong> {app.data}</p>
                    <p><strong>🕒 Ora:</strong> {app.orario}</p>
                    <p><strong>📍 Luogo:</strong> {app.luogo}</p>
                    <p><strong>👨‍⚕️ Medico:</strong> {app.medico}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section id="video" className="mt-8">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">Avvia Videochiamata</h2>
              <button onClick={() => window.open("https://meet.jit.si/StudioLegaleMariani", "_blank")} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Avvia con Jitsi Meet</button>
              <p className="text-sm text-gray-500 mt-2">La videochiamata si aprirà in una nuova finestra.</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white text-center py-4 shadow-inner">
        <p className="text-xs text-gray-500">&copy; 2025 Studio Infortunistica Mariani</p>
      </footer>
    </div>
  );
}
