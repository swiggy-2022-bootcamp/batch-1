/**
 * Utility function to send response
 * @param {string} status - Response status
 * @param {string} message - Response message
 * @param {object} data - Response data
 * @return {boolean} Whether the registration name is valid.
 */
const sendResponse = (res, status, message, data = {}) => {
  const jsonResponse = {
    message,
    ...data,
  };
  res.status(status);
  return res.send(jsonResponse);
};

module.exports = { sendResponse };
