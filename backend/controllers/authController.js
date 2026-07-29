const authService = require("../services/authService");

async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await authService.register({ email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Registration failed." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const { token, user } = await authService.login({ email, password });
    res.json({ token, user });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Login failed." });
  }
}

module.exports = { register, login };
