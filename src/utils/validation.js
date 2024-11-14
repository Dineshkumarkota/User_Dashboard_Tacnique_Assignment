export const isEmpty = (value) => value.trim() === "";
export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validateUserForm = ({ userName, email, department }) => {
  const errors = {};
  if (isEmpty(userName)) errors.name = "Name is required";
  if (!isValidEmail(email)) errors.email = "Email is invalid";
  if (isEmpty(department)) errors.department = "Department is required";
  return errors;
};
