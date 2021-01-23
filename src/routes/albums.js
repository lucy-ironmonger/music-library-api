// EXPRESS MAGIC 
const albumRouter = require('express').Router()

// PULLS IN THE LOGGING MIDDLEWARE 
const logging = require("../middleware/logging")

// PULLS IN THE VALIDATION MIDDLEWARE TO CHECK THE ARTIST ID
const { checkArtistId } = require('../middleware/validation')

// PULLS IN THE CONTROLLER FUNCTIONS FOR THE ALBUM
const { create, list } = require('../controllers/albums')

// RUNS THE ROUTES, USING THE MIDDLEWARE WE HAVE PULLED IN FOR LOGGING AND VALIDATION
albumRouter.post('/:artistId/albums', logging, checkArtistId, create);
albumRouter.get('/:artistId/albums', logging, list);

// EXPORTS OUT BACK TO APP.JS
module.exports = albumRouter;