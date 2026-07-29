const { randomUUID } = require("crypto");

// Shape of a User record:
// { id, email, passwordHash, createdAt }

function createUser({ email, passwordHash }) {
  return {
    id: randomUUID(),
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createUser };
