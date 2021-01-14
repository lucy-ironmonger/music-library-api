const { Album } = require("../models");


// UPDATE (U)
const createAlbum = (req, res) => {
  const { artistId } = req.params;
  Album.update(req.body, { where: { artist: artistId } }).then(([updatedArtist]) => {
    if (!updatedArtist) {
      res.status(404).json({ error: "ADD ALBUM the artist could not be found." });
    } else {
      Album.findByPk(id).then((updatedAlbum) => res.status(200).json(updatedAlbum));
    }
  });
};


module.exports = {
  createAlbum
};
