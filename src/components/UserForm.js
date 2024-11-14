import React, { useState, useEffect } from "react";
import { validateUserForm } from "../utils/validation";
import ErrorMessage from "./ErrorMessage"; // Import ErrorMessage component for error display

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [errorMessages, setErrorMessages] = useState({}); // State for storing error messages

  useEffect(() => {
    if (user) {
      setFormData(user); // If editing an existing user
    } else {
      // Initialize formData with empty values for new user
      setFormData({
        name: "",
        email: "",
        department: "",
      });
    }
  }, [user]); // Re-run this whenever the `user` prop changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateUserForm({
      userName: formData.name,
      email: formData.email,
      department: formData.department,
    });
    if (Object.keys(errors).length === 0) {
      onSave(formData.id, formData);
      setErrorMessages({});
    } else {
      setErrorMessages(errors);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{user ? "Edit" : "Add"} User</h2>

      <div className="form-field">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="input-field"
        />
        {errorMessages.firstName && (
          <ErrorMessage message={errorMessages.firstName} />
        )}
      </div>

      <div className="form-field">
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input-field"
        />
        {errorMessages.email && <ErrorMessage message={errorMessages.email} />}
      </div>

      <div className="form-field">
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="input-field"
        />
        {errorMessages.department && (
          <ErrorMessage message={errorMessages.department} />
        )}
      </div>

      <button type="submit" className="submit-button">
        Save
      </button>
    </form>
  );
};

export default UserForm;
