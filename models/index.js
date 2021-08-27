const User = require('./User');
const Artist = require('./Artist');
const Show = require('./Show');
const Venue = require('./Venue');
const FavoriteArtist = require('./FavoriteArtist');

User.belongsToMany(Artist, {
  through: {
    model: FavoriteArtist,
    unique: false,
  }
});

Artist.belongsToMany(User, {
  through: {
    model: FavoriteArtist,
    unique: false,
  }
});

Artist.belongsToMany(Venue, {
  through: {
    model: Show,
    unique: false,
  }
});

Venue.belongsToMany(Artist, {
  through: {
    model: Show,
    unique: false,
  }
});

User.hasMany(FavoriteArtist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Artist.hasMany(FavoriteArtist, {
  foreignKey: 'artist_id',
  onDelete: 'CASCADE',
})

Artist.hasMany(Show, {
  foreignKey: 'artist_id',
  onDelete: 'CASCADE',
});

Venue.hasMany(Show, {
  foreignKey: 'venue_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Artist, Show, Venue, FavoriteArtist };
