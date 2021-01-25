// REQUIRES ALBUM
const { Album, Artist } = require("../models");

//////////////////////////////////////////////////////////////////
// POST REQUEST (MATCHING ARTIST ID VALIDATION CARRIED OUT PRIOR)
//////////////////////////////////////////////////////////////////

const create = (request, response) => {
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

  //////////////////////////////
  // GET REQUEST FOR ALL ALBUMS
  /////////////////////////////

  const albumList = (request, response) => {
    Album.findAll().then(albums => response.status(200).json(albums))
  .catch(error => console.error('LIST: ERROR', error))
}

  //////////////////////////////
  // PATCH REQUEST FOR ALL ALBUMS
  /////////////////////////////

  const updateAlbum = (request, response) => {
    // const { artistId } = request.params.artistId; // store the artist path
    const { albumId } = request.params; // store the album path
    Album.update(request.body, { where: { id : albumId } })   // Update the album, taking the provided req.body and updating where the albumId matches
    .then(([updatedRows]) => {
      if (!updatedRows) {
        response.status(400).json({error: 'The album cannot be found in order to update'});
      } else {
        response.status(200).json(updatedRows)
      }
    })
    }


module.exports = {
  create,
  albumList,
  updateAlbum,
}


