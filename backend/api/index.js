// Entry point used when the backend is deployed to Vercel as serverless functions.
// Vercel routes all /api/* requests here (see backend/vercel.json), and the
// Express app itself still defines the real /api/... routes.
const app = require("../server");

module.exports = app;
