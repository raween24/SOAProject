import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Amira", age: 26 },
    { id: 2, name: "Rawen", age: 12 }
  ]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAdd = () => {
    if (!name || !age) return;
    setUsers([...users, { id: Date.now(), name, age: parseInt(age) }]);
    setName("");
    setAge("");
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleUpdate = (id) => {
    const user = users.find(u => u.id === id);
    const newName = prompt("Nouveau nom", user.name);
    const newAge = prompt("Nouvel âge", user.age);
    if (!newName || !newAge) return;
    setUsers(users.map(u => u.id === id ? { ...u, name: newName, age: parseInt(newAge) } : u));
  };

  return (
    <div className="app-container">
      <h1>Gestion des utilisateurs</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <button className="add" onClick={handleAdd}>Ajouter</button>
      </div>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.name} ({user.age} ans)</span>
            <div>
              <button className="update" onClick={() => handleUpdate(user.id)}>Modifier</button>
              <button className="delete" onClick={() => handleDelete(user.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
