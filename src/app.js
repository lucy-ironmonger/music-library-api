// SETUP
const express = require('express');

const app = express();

// Examples of application level middleware
app.use(express.json()); // express middleware for parsing application/json


// REQUIRE THE ROUTES
const artistRouter = require('./routes/artists')
const albumRouter = require('./routes/albums')


// RUN USING VALIDATION
app.use('/artists', artistRouter)
app.use('/albums', albumRouter) 

module.exports = app;
