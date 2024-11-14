import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
export const fetchUsers = () => axios.get(API_URL);

// Add a new user
export const addUser = (user) => axios.post(API_URL, user);

// Update an existing user by ID
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);

// Delete a user by ID
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
