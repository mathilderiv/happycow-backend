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
app.use(cors());

const signupRoute = require("./routes/signup");
app.use(signupRoute);

const loginRoute = require("./routes/login");
app.use(loginRoute);

app.all("*", (req, res) => {
  res.status(404).json("Cette route n'existe pas");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
