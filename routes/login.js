const express = require("express");

const router = express.Router();

//Import du modèle USER

const User = require("../models/User");

router.post("/login", async (req, res) => {
  res.json("Page login");
});

module.exports = router;
