const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FavoriteArtist extends Model {}

FavoriteArtist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        artist_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'artist',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'favoriteArtist',
    },
);

module.exports = FavoriteArtist;