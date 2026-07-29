const { randomUUID } = require("crypto");

// Shape of a Post record (documented here since we're not using an ORM):
// {
//   id: string,
//   userId: string,
//   title: string,
//   description: string,
//   platforms: string[],       // e.g. ["x", "instagram"]
//   mediaUrl: string | null,
//   mode: "now" | "schedule",
//   scheduledAt: string | null, // ISO date, only set when mode === "schedule"
//   status: "published" | "scheduled",
//   createdAt: string,
// }

function createPost({ userId, title, description, platforms, mediaUrl, mode, scheduledAt }) {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    userId,
    title,
    description: description || "",
    platforms: platforms || [],
    mediaUrl: mediaUrl || null,
    mode: mode === "schedule" ? "schedule" : "now",
    scheduledAt: mode === "schedule" ? scheduledAt : null,
    status: mode === "schedule" ? "scheduled" : "published",
    createdAt: now,
  };
}

module.exports = { createPost };
