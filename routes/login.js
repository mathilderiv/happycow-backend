const express = require("express");

const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//Import du modèle USER

const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.fields;
    //Chercher l'utilisateur qui veut se connecter
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      //Si il existe on passe à la suite
      //Vérifier que le MDP est bon
      const hashToVerify = SHA256(password + user.salt).toString(encBase64);

      if (hashToVerify === user.hash) {
        res.status(200).json({
          token: user.token,
          email: user.email,
          username: user.username,
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      //Sinon : unauthorized

      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
