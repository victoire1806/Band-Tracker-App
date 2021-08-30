const router = require("express").Router();
const { Artist, Venue, Show, User, FavoriteArtist } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const artistsData = await Artist.findAll();

    const artists = artistsData.map((artist) => artist.get({ plain: true }));
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const artistId = await Artist.findOne({
      where: {
        name: req.body.artist,
      },
    });

    console.log(artistId);

    const favoriteData = await FavoriteArtist.create({
      user_id: req.session.user_id,
      artist_id: artistId.id,
    });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//test

// router.get("/", async (req, res) => {
//     try {
//       const artistsData = await Artist.findAll();

//       const artists = artistsData.map((artist) => artist.get({ plain: true }));
//       res.status(200).json(artists);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });

//test

module.exports = router;
