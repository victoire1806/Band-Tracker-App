const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
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