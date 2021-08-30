const router = require('express').Router();
const { Artist, Venue, Show } = require('../../models');


router.get('/artists', async (req, res) => {
    try {
        const artistsData = await Artist.findAll();

        const artists = artistsData.map((artist) => artist.get({ plain: true }));
        res.status(200).json(artists)
    } catch (error) {
        res.status(500).json(error);
    };
});

module.exports =  router;