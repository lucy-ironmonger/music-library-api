// EXPRESS MAGIC 
const albumRouter = require('express').Router()

// PULLS IN THE LOGGING MIDDLEWARE 
const logging = require("../middleware/logging")

// PULLS IN THE VALIDATION MIDDLEWARE TO CHECK THE ARTIST ID
const { checkArtistId, checkAlbumId } = require('../middleware/validation')

// PULLS IN THE CONTROLLER FUNCTIONS FOR THE ALBUM
const { create, list } = require('../controllers/albums')

// RUNS THE ROUTES, USING THE MIDDLEWARE WE HAVE PULLED IN FOR LOGGING AND VALIDATION
albumRouter.post('/albums', logging, checkArtistId, create); 
albumRouter.post('/', logging, checkArtistId, create); 
albumRouter.get('/', logging, list);
albumRouter.get('/albums', logging, list);

// EXPORTS OUT BACK TO APP.JS
module.exports = albumRouter; 