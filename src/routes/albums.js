// EXPRESS MAGIC 
const albumRouter = require('express').Router()

// PULLS IN THE LOGGING MIDDLEWARE 
const logging = require("../middleware/logging")

// PULLS IN THE VALIDATION MIDDLEWARE TO CHECK THE ARTIST ID
const { checkArtistId } = require('../middleware/validation')

// PULLS IN THE CONTROLLER FUNCTIONS FOR THE ALBUM
const { create, albumList, updateAlbum } = require('../controllers/albums')

// RUNS THE ROUTES, USING THE MIDDLEWARE WE HAVE PULLED IN FOR LOGGING AND VALIDATION
albumRouter
  .post('/:artistId/albums', logging, checkArtistId, create)
  .get('/', logging, albumList)
  .patch('/:albumId', logging, updateAlbum);

// EXPORTS OUT BACK TO APP.JS
module.exports = albumRouter;