// REQUIRES ALBUM
const { Album, Artist } = require("../models");

// POST REQUEST (MATCHING ARTIST ID VALIDATION CARRIED OUT PRIOR)
const createAlbum = (request, response) => {
  let artist;
  Artist.findByPk(request.params.artistId)
  .then(selectedArtist => { artist = selectedArtist })
  .then(() => {
    return Album.create({
    name: request.body.name,
    year: request.body.year
  })}) 
    .then(album => { 
      album.setArtist(artist)
      .then(nestedUpdatedAlbum => {
        response.status(201).json(nestedUpdatedAlbum)
      })}) 
    .catch(error => console.error('There is an error creating the album', error));
  }

module.exports = {
  createAlbum,
}


