const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readDb, writeDb } = require("../config/db");
const { createUser } = require("../models/User");
const { JWT_SECRET } = require("../middleware/auth");

async function register({ email, password }) {
  const db = readDb();

  const existing = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    const err = new Error("An account with this email already exists.");
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ email, passwordHash });

  db.users.push(user);
  writeDb(db);

  return toPublicUser(user);
}

async function login({ email, password }) {
  const db = readDb();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    const err = new Error("Invalid email or password.");
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const err = new Error("Invalid email or password.");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user: toPublicUser(user) };
}

function toPublicUser(user) {
  return { id: user.id, email: user.email, createdAt: user.createdAt };
}

module.exports = { register, login };
