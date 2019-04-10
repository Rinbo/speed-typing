export const validations = (name, password, setErrors) => {
  const errors = {};
  errors.exist = false;
  if (password.length < 6) {
    errors.password = "Password must be 6 characters long or more";
    errors.exist = true;
  }
  if (name.length < 1 || name.length > 15) {
    errors.name = "Name must be between 1 and 15 characters long";
    errors.exist = true;
  }
  setErrors(errors);
};
