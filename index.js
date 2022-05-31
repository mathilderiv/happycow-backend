require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
  console.log("connected");
});

const app = express();
app.use(formidable());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const signinRoute = require("./routes/signin");
app.use(signinRoute);

app.all("*", (req, res) => {
  res.status(400).json("route introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
