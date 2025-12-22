import UserItem from "./UserItem";

export default function UserList({ users, onDelete, onUpdate }) {
  return (
    <ul>
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
