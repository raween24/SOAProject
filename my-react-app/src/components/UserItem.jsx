export default function UserItem({ user, onDelete, onUpdate }) {
  const handleDelete = () => {
    fetch(`http://localhost:8080/tp333/api/users/remove/${user.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => onDelete(user.id));
  };

  const handleUpdate = () => {
    const newName = prompt("Nouveau nom", user.name);
    const newAge = prompt("Nouvel âge", user.age);
    if (!newName || !newAge) return;

    fetch(`http://localhost:8080/tp333/api/users/update/${user.id}/${newAge}/${newName}`, { method: "PUT" })
      .then(res => res.json())
      .then(data => onUpdate(data.user));
  };

  return (
    <li>
      {user.name} ({user.age} ans)
      <button onClick={handleUpdate}>Modifier</button>
      <button onClick={handleDelete}>Supprimer</button>
    </li>
  );
}
