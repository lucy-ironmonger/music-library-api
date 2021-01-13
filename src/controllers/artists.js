const { Artist } = require("../models");

const create = (req, res) => {
  Artist.create(req.body).then((artist) => res.status(201).json(artist));
};

const list = (req, res) => {
  Artist.findAll({}).then((artist) => res.status(200).json(artist));
};

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

// // MY VERSION - TRYING TO MAKE IT WORK TO FEED A 204
// const artistDelete = (req, res) => {
//   Artist.findByPk(req.params.artistID)
//   .then(([requestedArtist]) => { 
//     if (!requestedArtist) {
//       res.status(404).json({ error: "the artist could not be found." });
//     } else {
//     res.status(204).json( { error: "requestedArtist is deleted" } )
//       .catch(error => console.error('there is an error in artistDelete', error))
//     }
//   });
// };

// MY VERSION
const artistDelete = (req, res) => {
  const { artistID } = req.params
  Artist.destroy({ where: { id: artistID } })
  .then((rowsDeleted) => {
    if (!rowsDeleted) {
      res.status(404).json({ error: 'artist not found'})
      .catch(error => console.error('there is an error in artistDelete', error))
    } else {
      // res.status(204).json(rowsDeleted,  'Artist deleted') Opt 1 
      res.status(204).json({ error: 'artist deleted' })
      .catch(error => console.error('there is an error in artistDelete', error))
};
})
};


// A REFACTORED VERSION 
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
  artistDelete
};
