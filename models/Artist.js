const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
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
        timestamps: false,
        underscored: true,
        modelName: 'artist'
    }
)

module.exports = Artist;