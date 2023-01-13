const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SeedRequests extends Model {}

SeedRequests.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    requestedSeed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestPostDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'SeedRequests',
  }
);

module.exports = SeedRequests;
