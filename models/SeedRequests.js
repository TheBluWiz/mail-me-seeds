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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    seedoffers_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'seedOffers',
        key: 'id',
      },
    },
    sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    // timestamps: true, 
    freezeTableName: true,
    // underscored: true,
    modelName: 'seedRequests',
  }
);

module.exports = SeedRequests;
//causing unknown column error in mysql