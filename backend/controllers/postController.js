const postService = require("../services/postService");

function getPosts(req, res) {
  const posts = postService.listPosts(req.user.id);
  res.json({ posts });
}

function getStats(req, res) {
  const stats = postService.getStats(req.user.id);
  res.json({ stats });
}

function createPost(req, res) {
  try {
    const { title, description, platforms, mode, scheduledAt } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required." });
    }

    let parsedPlatforms = platforms;
    if (typeof platforms === "string") {
      try {
        parsedPlatforms = JSON.parse(platforms);
      } catch {
        parsedPlatforms = platforms.split(",").map((p) => p.trim());
      }
    }

    if (mode === "schedule" && !scheduledAt) {
      return res.status(400).json({ message: "Choose a date/time to schedule this post." });
    }

    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const post = postService.addPost(req.user.id, {
      title: title.trim(),
      description,
      platforms: parsedPlatforms || [],
      mediaUrl,
      mode,
      scheduledAt,
    });

    res.status(201).json({ post });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Could not create post." });
  }
}

function updatePost(req, res) {
  try {
    const post = postService.updatePost(req.user.id, req.params.id, req.body);
    res.json({ post });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Could not update post." });
  }
}

function deletePost(req, res) {
  try {
    postService.deletePost(req.user.id, req.params.id);
    res.json({ message: "Post deleted." });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Could not delete post." });
  }
}

module.exports = { getPosts, getStats, createPost, updatePost, deletePost };
