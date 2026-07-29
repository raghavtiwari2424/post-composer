const express = require("express");
const router = express.Router();
const PLATFORMS = require("../config/platforms");

router.get("/", (req, res) => {
  res.json({ platforms: PLATFORMS });
});

module.exports = router;
