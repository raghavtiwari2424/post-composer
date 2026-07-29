const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  getPosts,
  getStats,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.use(requireAuth);

router.get("/", getPosts);
router.get("/stats", getStats);
router.post("/", upload.single("media"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
