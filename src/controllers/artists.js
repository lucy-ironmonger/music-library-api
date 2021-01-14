const { Artist } = require("../models");

// CREATE (C)
const create = (req, res) => {
  Artist.create(req.body).then((artist) => res.status(201).json(artist));
};

// LIST (R)
const list = (req, res) => {
  Artist.findAll({}).then((artist) => res.status(200).json(artist));
};

// FIND (R)
const find = (req, res) => {
  const { artistId } = req.params;
  Artist.findByPk(artistId).then((artist) => {
    if (!artist) {
      res.status(404).json({ error: "GET the artist could not be found." });
    } else {
      res.status(200).json(artist);
    }
  });
};
 
// UPDATE (U)
const update = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { where: { id } }).then(([updatedArtist]) => {
    if (!updatedArtist) {
      res.status(404).json({ error: "PATCH the artist could not be found." });
    } else {
      Artist.findByPk(id).then((updatedArtist) => res.status(200).json(updatedArtist));
    }
  });
};

// DELETE (D)
const artistDelete = (req, res) => {
  const { artistID } = req.params
  console.log(artistID)
  Artist.destroy({ where: { id: artistID } })
  .then((rowsDeleted) => {
    if (!rowsDeleted) {
      res.status(404).json({ error: 'DELETE artist not found'})
    } else {
      res.status(204).json( { message: 'DELETE artist deleted'} )
};
}).catch(error => console.error('DELETE there is an error in artistDelete', error))
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
