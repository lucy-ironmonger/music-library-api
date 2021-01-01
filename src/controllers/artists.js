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
      res.status(404).json({ error: "the artist could not be found." });
    } else {
      res.status(200).json(artist);
    }
  });
};
 
const update = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { where: { id } }).then(([updatedArtist]) => {
    if (!updatedArtist) {
      res.status(404).json({ error: "The artist could not be found." });
    } else {
      console.log("Updated artist record.");
      Artist.findByPk(id).then((updatedArtist) => res.status(200).json(updatedArtist));
    }
  });
};

module.exports = {
  create,
  list,
  find,
  update,
};
