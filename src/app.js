// SETUP
const express = require("express");

const app = express();

app.use(express.json());

const artistController = require("./controllers/artists.js")
const albumController = require("./controllers/albums.js")

//TEST
app.get("/", (req, res) => {
  res.status(201).send("Hello world");
});

app.post('/artists', artistController.create); 

app.get('/artists', artistController.list);

app.get('/artists/:artistId', artistController.find);

app.patch('/artists/:id', artistController.update);

app.delete('/artists/:artistID', artistController.artistDelete);

app.post('/artists/:artistId/albums', albumController.createAlbum); 

module.exports = app;
