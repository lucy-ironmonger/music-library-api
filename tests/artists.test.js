const { expect } = require("chai");
const request = require("supertest");
const { Artist } = require("../src/models");
const app = require("../src/app");
const artist = require("../src/models/artist");

describe("/artists", () => {
  before(async () => {
    try {
      await Artist.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  // POST ARTISTS TO DATABASE
  describe("POST /artists", async () => {
    it("creates a new artist in the database", async () => {
      const response = await request(app).post("/artists").send({
        name: "Tame Impala",
        genre: "Rock",
      });

      await expect(response.status).to.equal(201);
      expect(response.body.name).to.equal("Tame Impala");

      const insertedArtistRecords = await Artist.findByPk(response.body.id, {
        raw: true,
      });
      expect(insertedArtistRecords.name).to.equal("Tame Impala");
      expect(insertedArtistRecords.genre).to.equal("Rock");
    });
  });

  // GET ARTIST RESULTS FROM DATABASE
  describe("set artists in the database", () => {
    let artists;
    beforeEach((done) => {
      Promise.all([
        Artist.create({ name: "Tame Impala", genre: "Rock" }),
        Artist.create({ name: "Kylie Minogue", genre: "Pop" }),
        Artist.create({ name: "Dave Brubeck", genre: "Jazz" }),
      ]).then((documents) => {
        artists = documents;
        done();
      });
    });

    // GET REQUESTS
    describe("GET /artists", () => {
      it("gets all artist records", (done) => {
        request(app)
          .get("/artists")
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((artist) => {
              const expected = artists.find((a) => a.id === artist.id);
              expect(artist.name).to.equal(expected.name);
              expect(artist.genre).to.equal(expected.genre);
            });
            done();
          });
      });
    });

    describe("GET /artists/:artistId", () => {
      it("gets artist record by id", (done) => {
        const artist = artists[0];
        request(app)
          .get(`/artists/${artist.id}`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(artist.name);
            expect(res.body.genre).to.equal(artist.genre);
            done();
          });
      });

      it("returns a 404 if the artist does not exist", (done) => {
        // const artist = artists[0] // check it was failing
        request(app)
          // .get(`/artists/${artist.id}`) // check it was failing
          .get("/artists/12345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal(
              "GET the artist could not be found."
            );
            done();
          })
          .catch((error) => {
            done(error);
          });
      });
    });

    // PATCH REQUESTS
    describe("PATCH /artists/:id", () => {
      it("updates artist genre by id", (done) => {
        const artist = artists[0];
        request(app)
          .patch(`/artists/${artist.id}`) //locating by req.params
          .send({ genre: "Psychedelic Rock" }) // sending in req.body
          .then((res) => {
            expect(res.status).to.equal(200);
            Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
              expect(updatedArtist.genre).to.equal("Psychedelic Rock");
              done();
            });
          });
      });

      it("updates artist name by id", (done) => {
        const artist = artists[0];
        request(app)
          .patch(`/artists/${artist.id}`) //locating by req.params
          .send({ name: "Nina Simone" }) // sending in req.body
          .then((res) => {
            expect(res.status).to.equal(200);
            Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
              expect(updatedArtist.name).to.equal("Nina Simone");
              expect(updatedArtist.genre).to.not.equal("Psychedelic Rock");
              done();
            });
          });
      });

      it("returns a 404 if the artist does not exist", (done) => {
        // const artist = artists[0]; // check if it was failing
        // Artist.findAll({}, { raw : true}).then((artistDocuments) => { // check if it was failing
          request(app)
            .patch("/artists/12345")
            .send({ name: "Nina Simone" }) // sending in req.body
            .then((res) => {
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal(
                "PATCH the artist could not be found."
              );
              // const artist = artists;
              done();
            })
            .catch((error) => {
              done(error);
            });
        });
      });
    

    describe('DELETE /artists/:artistID', () => {
      it('deletes artist record by id', (done) => {
        const artist = artists[0];
        request(app)
          .delete(`/artists/${artist.id}`)
          .then((res) => {
            expect(res.status).to.equal(204);
            Artist.findByPk(artist.id, { raw: true })
              .then((deletedArtist) => {
              expect(deletedArtist).to.equal(null);
              done();
            })
            .catch((error) => {
              done(error);
            });
            }).catch((error) => {
              done(error);
            });
          });


        });
  });
});



