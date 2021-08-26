const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Venue extends Model {}

Venue.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2],
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'venue'
    }
)

module.exports = Venue;