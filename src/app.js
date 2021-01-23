// SETUP
const express = require('express');

const app = express();

app.use(express.json()); 

// // REQUIRE THE ROUTES
const artistRouter = require('./routes/artists')
const albumRouter = require('./routes/albums')


// RUN USING VALIDATION
app.use('/artists', artistRouter)
app.use('/artists', albumRouter);
app.use('/albums', albumRouter);


module.exports = app;
