const sequelize = require('../config/connection');
const { User, Show, Venue, Artist, FavoriteArtist } = require('../models');

const userData = require('./userData.json');
const artistData = require('./artistData.json');
const venueData = require('./venueData.json');
const showData = require('./showData.json');
const favoritesData = require('./favoritesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const artists = await Artist.bulkCreate(artistData, {
    individualHooks: false,
    returning: true,
  });

  const venues = await Venue.bulkCreate(venueData, {
    individualHooks: false,
    returning: true,
  });

  const shows = await Show.bulkCreate(showData, {
    individualHooks: false,
    returning: true,
  });
  
  const favorites = await FavoriteArtist.bulkCreate(favoritesData, {
    individualHooks: false,
    returning: true,
  });
  

  process.exit(0);
};

seedDatabase();
