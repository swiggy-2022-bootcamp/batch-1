const app = require('./app.js');

// Start server
const HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT, () => console.log(`Server running on port ${HTTP_PORT}`));