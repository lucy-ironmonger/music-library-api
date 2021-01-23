// EXPRESS MAGIC 
const artistRouter = require('express').Router({mergeParams: true})

// PULLS IN THE ALBUM ROUTER
const albumRouter = require('./albums')

// PULLS IN THE CONTROLLER FUNCTIONS FOR THE ARTIST
const { 
    create, 
    list,
    find, 
    update, 
    artistDelete
  } = require('../controllers/artists')

// PULLS IN THE LOGGING MIDDLEWARE 
const logging = require('../middleware/logging')

// INITIAL TEST TO CHECK PATHS - NOT NEEDED AFTER WE START
// artistRouter.get('/', (request, response) => {
//     response.status(201).send("Hello world");
//   });


// ARTIST PATH VALIDATION
artistRouter.get('/', logging, list);
artistRouter.get('/:artistId', logging, find);
artistRouter.post('/', logging, create); 
artistRouter.patch('/:artistId', logging, update);
artistRouter.delete('/:artistId', logging, artistDelete);


// EXPORTS OUT BACK TO APP.JS
module.exports = artistRouter;