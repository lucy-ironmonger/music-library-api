// SETUP
const express = require('express');

const app = express();

const router = require('express').Router()

// Examples of application level middleware
app.use(express.json()); // express middleware for parsing application/json


// // REQUIRE THE ROUTES
const artistRouter = require('./routes/artists')
// const albumRouter = require('./routes/albums')


// RUN USING VALIDATION
app.use('/artists', artistRouter)
// app.use('/albums', albumRouter) 
// app.use('/artists', artistRouter, albumRouter)


// // THIS WORKS
const albumController = require("./controllers/albums");
// app.post("/artists/:artistId/albums", albumController.create);

// HOW ABOUT THIS
app.use('/artists', router);
router.post("/:artistId/albums", albumController.create);

module.exports = app;
