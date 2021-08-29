const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Show extends Model {}

Show.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'artist',
                key: 'id',
            },
        },
        venue_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'venue',
                key: 'id',
            },
        },
        ticketmaster_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'show'
    },
)

module.exports = Show;