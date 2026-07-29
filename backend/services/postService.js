const { readDb, writeDb } = require("../config/db");
const { createPost } = require("../models/Post");

function listPosts(userId) {
  const db = readDb();
  return db.posts
    .filter((p) => p.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getStats(userId) {
  const posts = listPosts(userId);
  return {
    total: posts.length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    published: posts.filter((p) => p.status === "published").length,
  };
}

function addPost(userId, payload) {
  const db = readDb();
  const post = createPost({ userId, ...payload });
  db.posts.push(post);
  writeDb(db);
  return post;
}

function updatePost(userId, postId, updates) {
  const db = readDb();
  const index = db.posts.findIndex(
    (p) => p.id === postId && p.userId === userId
  );
  if (index === -1) {
    const err = new Error("Post not found.");
    err.status = 404;
    throw err;
  }
  db.posts[index] = { ...db.posts[index], ...updates };
  writeDb(db);
  return db.posts[index];
}

function deletePost(userId, postId) {
  const db = readDb();
  const index = db.posts.findIndex(
    (p) => p.id === postId && p.userId === userId
  );
  if (index === -1) {
    const err = new Error("Post not found.");
    err.status = 404;
    throw err;
  }
  const [removed] = db.posts.splice(index, 1);
  writeDb(db);
  return removed;
}

module.exports = { listPosts, getStats, addPost, updatePost, deletePost };
