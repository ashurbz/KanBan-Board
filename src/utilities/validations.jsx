export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (fullName) => {
  return fullName.length > 1;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateUserName = (userName) => {
  return userName.length > 1;
};
