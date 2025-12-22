import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Chargement...");

  const API_URL = "http://localhost:8080/tp333/api/users";

  // Charger les utilisateurs au démarrage
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setStatus("Chargement des utilisateurs...");
      const response = await fetch(`${API_URL}/affiche`);
      if (response.ok) {
        const data = await response.json();
        // Ajouter champs d'édition inline
        const editableUsers = data.map(u => ({ ...u, editMode: false, editName: u.name, editAge: u.age }));
        setUsers(editableUsers);
        setStatus(`${data.length} utilisateur(s)`);
      } else setStatus("Erreur de connexion");
    } catch (err) {
      console.error(err);
      setStatus("Backend non disponible");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!name || !age) return alert("Veuillez remplir le nom et l'âge");
    try {
      setLoading(true);
      setStatus("Ajout en cours...");
      const response = await fetch(`${API_URL}/add/${age}/${name}`, { method: "PUT", headers: { 'Content-Type': 'application/json' } });
      if (response.ok) {
        setName(""); setAge(""); await fetchUsers();
        setStatus(`${name} ajouté avec succès!`);
      }
    } catch (err) {
      console.error(err); setStatus("Erreur d'ajout");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/remove/${id}`, { method: "DELETE" });
      if (response.ok) { await fetchUsers(); setStatus("Utilisateur supprimé"); }
    } catch (err) { console.error(err); setStatus("Erreur lors de la suppression"); }
    finally { setLoading(false); }
  };

  const toggleEdit = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, editMode: !u.editMode } : u));
  };

  const handleSave = async (user) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/update/${user.id}/${user.editAge}/${user.editName}`, { method: "PUT" });
      if (response.ok) {
        await fetchUsers();
        setStatus(`${user.editName} mis à jour`);
      }
    } catch (err) { console.error(err); setStatus("Erreur lors de la modification"); }
    finally { setLoading(false); }
  };

  return (
    <div className="app-container">
      <div className="main-card">
        {/* Header */}
        <header className="app-header">
          <h1>Gestion des Utilisateurs</h1>
          <div className={`status-indicator ${status.includes("Erreur") ? "error" : "success"}`}>
            <span className={`status-dot ${status.includes("Erreur") ? "error" : "success"}`}></span>
            <span className="status-text">{status}</span>
          </div>
        </header>

        {/* Ajouter utilisateur */}
        <section className="form-section">
          <h2>Ajouter un utilisateur</h2>
          <div className="input-group">
            <input type="text" placeholder="Nom complet" value={name} onChange={e => setName(e.target.value)} disabled={loading}/>
            <input type="number" placeholder="Âge" value={age} onChange={e => setAge(e.target.value)} min="1" max="120" disabled={loading}/>
            <button className="add-button" onClick={handleAdd} disabled={loading || !name || !age}>{loading ? "..." : "➕ Ajouter"}</button>
          </div>
        </section>

        {/* Liste utilisateurs */}
        <section className="users-section">
          <div className="section-header">
            <h2>Liste des utilisateurs</h2>
            <span className="users-count">{users.length}</span>
          </div>

          {loading ? (
            <div className="loading-state"><div className="spinner"></div><p>Chargement...</p></div>
          ) : users.length === 0 ? (
            <div className="empty-state"><p>Aucun utilisateur trouvé</p></div>
          ) : (
            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <div className="user-info">
                    {user.editMode ? (
                      <>
                        <input value={user.editName} onChange={e => setUsers(users.map(u => u.id === user.id ? { ...u, editName: e.target.value } : u))} />
                        <input type="number" value={user.editAge} onChange={e => setUsers(users.map(u => u.id === user.id ? { ...u, editAge: e.target.value } : u))} min="1" max="120" />
                      </>
                    ) : (
                      <>
                        <h3>{user.name}</h3>
                        <p>{user.age} ans • ID: {user.id}</p>
                      </>
                    )}
                  </div>
                  <div className="user-actions">
                    {user.editMode ? (
                      <>
                        <button className="action-btn edit" onClick={() => handleSave(user)} disabled={loading}>💾 Sauvegarder</button>
                        <button className="action-btn delete" onClick={() => toggleEdit(user.id)} disabled={loading}>❌ Annuler</button>
                      </>
                    ) : (
                      <>
                        <button className="action-btn edit" onClick={() => toggleEdit(user.id)} disabled={loading}>✏️ Modifier</button>
                        <button className="action-btn delete" onClick={() => handleDelete(user.id)} disabled={loading}>🗑 Supprimer</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
