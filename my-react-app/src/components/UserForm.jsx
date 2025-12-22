
import { useState } from "react";

export default function UserForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = () => {
    if (!name || !age) return alert("Remplir nom et âge");

    fetch(`http://localhost:8080/tp333/api/users/add/${age}/${name}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(data => {
        onAdd(data.user);
        setName("");
        setAge("");
      });
  };

  return (
    <div>
      <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Âge" type="number" value={age} onChange={e => setAge(e.target.value)} />
      <button onClick={handleSubmit}>Ajouter</button>
    </div>
  );
}
