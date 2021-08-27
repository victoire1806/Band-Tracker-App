const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_image_link : {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'artist'
    }
)

module.exports = Artist;