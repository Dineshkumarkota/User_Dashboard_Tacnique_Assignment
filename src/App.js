import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "./api/userService";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
        console.log("Fetched Users:", response.data); // Log fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  const handleAddUser = async (user) => {
    console.log("Adding user:", user); // Log the user object to see if it contains all fields
    try {
      const response = await addUser(user);
      console.log("New User Added:", response.data);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      const response = await updateUser(id, updatedUser);
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setShowForm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddClick = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <h1>User Management Dashboard</h1>
      <UserList
        users={users}
        onEdit={handleEditClick}
        onDelete={handleDeleteUser}
        onAdd={handleAddClick}
      />
      {showForm && (
        <UserForm
          user={selectedUser}
          onSave={selectedUser ? handleUpdateUser : handleAddUser}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default App;
