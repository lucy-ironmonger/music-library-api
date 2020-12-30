// SETUP
const express = require("express");

const app = express();

app.use(express.json());

const artistController = require("./controllers/artists.js")

//TEST
app.get("/", (req, res) => {
  res.status(201).send("Hello world");
});

app.post('/artists', artistController.create); 

module.exports = app;
