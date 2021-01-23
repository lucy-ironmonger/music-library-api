// PULLING IN MODELS
const { Artist } = require('../../models');
const { Album } = require('../../models');

// VALIDATION FOR ALBUMS - CHECKING THE ARTIST ID MATCHES
const checkArtistId = (request, response, next) => {
    Artist.findByPk(request.params.artistId || request.body.artistId)
    .then(artist => {
      if(!artist) {
        response.status(404).send({error: 'The artist could not be found.' })
      } else {
        // response.locals.artist = artist
        return next()
      }
    })
  }
  
const checkAlbumId = (request, response, next) => {
    Album.findByPk(req.params.albumId)
    .then(album => {
      if(!album) {
        response.status(404).send({error: 'The album could not found' })
      } else {
        response.locals.album = album
        return next()
      }
    })
  }

module.exports = {
  checkArtistId,
  checkAlbumId,
};