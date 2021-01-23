/* eslint-disable no-console */
const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Artist, Album } = require("../src/models");

describe("/albums", () => {
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
        name: "Tame Impala",
        genre: "Rock",
      });
    } catch (err) {
      console.log(err);
    }
  });

  ///////////////////////////
  // CREATING ALBUMS (POST)
  ///////////////////////////

  describe("POST /artists/:artistId/albums", () => {
    it("creates a new album for a given artist", (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: "InnerSpeaker",
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Album.findByPk(res.body.id, { raw: true })
            .then((album) => {
              expect(album.name).to.equal("InnerSpeaker");
              expect(album.year).to.equal(2010);
              expect(album.artistId).to.equal(artist.id);
              done();
            })
            .catch((error) => done(error));
        })
        .catch((error) => done(error));
    });

    it("returns a 404 and does not create an album if the artist does not exist", (done) => {
      request(app)
        .post("/artists/1234/albums")
        .send({
          name: "InnerSpeaker",
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The artist could not be found.");

          Album.findAll().then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          });
        });
    });
  });

  ///////////////////////////
  // READING THE ALBUMS (GET)
  ///////////////////////////

  // Feed artists into the tests
  describe("setting up some artists and associated albums for testing", () => {
    let artists;
    let albums;
  
    beforeEach((done) => {
      Promise.all([
        Artist.create({ name: "DjRUM", genre: "Electronic" }),
        Artist.create({ name: "Daniel Avery", genre: "Drone" }),
        Artist.create({ name: "Studnitzky", genre: "Jazz" }),
      ]).then((artistDocuments) => {
        artists = artistDocuments;
      });
      done();
    });

      beforeEach((done) => {
        Promise.all([
          Album.create({ name: "Portrait with Firewood", year: 2018 }).then(album => album.setArtist(artists[0])),
          Album.create({ name: "Seven Lies", year: 2013 }).then(album => album.setArtist(artists[0])),
          Album.create({ name: "Drone Logic", year: 2013 }).then(album => album.setArtist(artists[1])),
          Album.create({ name: "New Energy Collected Remixes", year: 2015 }).then(album => album.setArtist(artists[1])),
          Album.create({ name: "KY Do Mar", year: 2012 }).then(album => album.setArtist(artists[2]))
          ])
          .then((documents) => {
          albums = documents;
        });
        console.log(albums)
        done();
      });

      describe("GET /albums", () => {
        it("gets all albums in the database", (done) => {
          request(app)
            .get("/albums")
            .then((response) => {
              expect(response.status).to.equal(200);
              expect(response.body.length).to.equal(5);
              response.body.forEach(album => {
                const expected = albums.find((a) => a.id === album.id);
                expect(album.artistName).to.equal(expected.artistName);
                expect(album.year).to.equal(expected.year);
                expect(album.artistId).to.equal(expected.artistId);
              });
              console.log(albums)
              done();
            })
            .catch((error) => done(error));
        });
      }); // CLOSE of DESCRIBE GET ALBUMS



    }); // SET ALBUMS IN DATABASE - KEEP TIL END
  }); // SET ARTISTS IN DATABASE - KEEP TIL END 
