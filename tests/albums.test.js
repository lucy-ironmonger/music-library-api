/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/models');

describe('/albums', () => {
  let artist;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      })
    } catch (err) {
      console.log(err);
    }
  });

  // CREATING ALBUMS (POST)
  describe('POST /albums/artists/:artistId', () => {
    it('creates a new album for a given artist', (done) => {
      request(app)
        .post(`/albums/artists/${artist.id}`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Album.findByPk(res.body.id, { raw: true }).then((album) => {
            console.log(res.body.id);
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artistId).to.equal(artist.id);
            done();
          }).catch(error => done(error));
        }).catch(error => done(error));
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/albums/artists/1234')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.findAll().then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          });
        });
    });
  });


// READING THE ALBUMS (GET)
describe("set artists in the database", () => {
  let artists;
  beforeEach((done) => {
    Promise.all([
    Artist.create({ name: "DjRUM", genre: "Electronic"  }),
    Artist.create({ name: "Daniel Avery", genre: "Drone" }),
    Artist.create({ name: "Studnitzky", genre: "Jazz" }),
    ]).then((artistDocuments) => {
      artists = artistDocuments;
    })
      done();
    });
  
    describe("set albums in the database", () => {
    let albums;
    beforeEach((done) => {
    Promise.all([
      Album.create({ name: "Portrait with Firewood", year: 2018}).then(album => album.setArtist(artists[0])),
      Album.create({ name: "Seven Lies", year: 2013 }).then(album => album.setArtist(artists[0])),
      Album.create({ name: "Drone Logic", year: 2013 }).then(album => album.setArtist(artists[1])),
      Album.create({ name: "New Energy Collected Remixes", year: 2015 }).then(album => album.setArtist(artists[1]))
      Album.create({ name: "KY Do Mar", year: 2012 }).then(album => album.setArtist(artists[2])),
    ]).then(documents => {
      albums = documents
    })
      done();
    });
  

describe("GET /albums", () => {
  it("gets all albums in the database", (done) => {
    request(app)
      .get("/albums")
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(5);
        res.body.forEach((artist) => {
          const expected = artists.find((a) => a.id === artist.id);
          expect(artist.name).to.equal(expected.name);
          expect(artist.genre).to.equal(expected.genre);
        });
        done();
      })
      })
      })


 }) // SET ALBUMS IN DATABASE
}) // SET ARTISTS IN DATABASE
});    
