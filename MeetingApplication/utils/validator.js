/**
 * Utility function to validate registration name.
 * String without space and numeric digits.
 * @param {string} name - The registration name to be validated.
 * @return {boolean} - Whether the registration name is valid.
 */
const validateName = (name) => {
  const nameValidationRegex = /^[a-zA-Z]+$/;
  return nameValidationRegex.test(name);
};

/**
 * Utility function to validate email (i.e. user_id) to be proper email.
 * @param {string} email - The email (i.e. user_id) to be validated.
 * @return {boolean} - Whether the email is valid.
 */
const validateEmail = (email) => {
  const emailValidationRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return emailValidationRegex.test(String(email || "").toLowerCase());
};

/**
 * Utility function to validate password.
 * 6 to 15 characters containing at least one digit, one uppercase and one lowercase letter.
 * @param {string} password - The password to be validated.
 * @return {boolean} - Whether the password is valid.
 */
const validatePassword = (password) => {
  const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
  return passwordValidationRegex.test(String(password || ""));
};

/**
 * Utility function to validate date.
 * @param {object} password - The object to be validated.
 * @return {boolean} - Whether the object is date type.
 */
const validateDate = (dateObject) => {
  return new Date(dateObject).toString() !== "Invalid Date";
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateDate,
};
