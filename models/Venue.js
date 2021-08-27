const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Venue extends Model {}

Venue.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2],
            },
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
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