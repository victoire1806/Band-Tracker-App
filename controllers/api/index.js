const router = require('express').Router();
const artistRoutes = require('./artist-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/artist', artistRoutes);

module.exports = router;
