const { Artist } = require("../models");

/////////////
// CREATE (C)
/////////////

const create = (request, response) => {
  Artist.create(request.body).then((artist) => response.status(201).json(artist))
  .catch(error => console.error('CREATE: ERROR', error))
};

////////////
// LIST (R)
/////////////

const list = (request, response) => {
  Artist.findAll({}).then((artist) => response.status(200).json(artist))
  .catch(error => console.error('LIST: ERROR', error))
}

/////////////
// FIND (R)
/////////////

const find = (request, response) => {
  const { artistId } = request.params;
  Artist.findByPk(artistId).then((artist) => {
    if (!artist) {
      response.status(404).json({ error: "GET the artist could not be found." });
    } else {
      response.status(200).json(artist);
    }
  }).catch(error => console.error('GET : there is an error in artist find', error))
};
 
/////////////
// UPDATE (U)
/////////////

const update = (request, response) => {
  const { artistId } = request.params;
  Artist.update(request.body, { where: { id : artistId } }).then(([updatedArtist]) => {
    if (!updatedArtist) {
      response.status(404).json({ error: "PATCH the artist could not be found." });
    } else {
      Artist.findByPk(artistId).then((updatedArtist) => response.status(200).json(updatedArtist));
    }
  }).catch(error => console.error('PATCH : there is an error in artist update', error))
};

/////////////
// DELETE (D)
/////////////

const artistDelete = (request, response) => {
  const { artistId } = request.params
  Artist.destroy({ where: { id: artistId } })
  .then((rowsDeleted) => {
    if (!rowsDeleted) {
      response.status(404).json({ error: 'DELETE artist not found'})
    } else {
      response.status(204).json( { message: 'DELETE artist deleted'} )
};
}).catch(error => console.error('DELETE : there is an error in artistDelete', error))
};

// A REFACTORED DELETE VERSION (ANNA B)
// const artistDelete = (req, res) => {
//   Artist.destroy({ where: { id: req.params.artistId }})
//   .then((rowsDeleted) => res.status(204).json({ rowsDeleted }))
//   .catch(error => console.error('there is an error in artistDelete', error))
// }

module.exports = {
  create,
  list,
  find,
  update,
  artistDelete,
};
