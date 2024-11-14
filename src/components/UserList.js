import React from "react";

const UserList = ({ users, onEdit, onDelete, onAdd }) => {
  console.log("Users in UserList:", users);
  return (
    <div className="user-list-container">
      <button className="add-button" onClick={onAdd}>
        Add User
      </button>
      <h2>User List</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
