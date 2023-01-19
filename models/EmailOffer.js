const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class EmailOffer extends Model {}
// Not using this table ATM
EmailOffer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    resetLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: { // who offered the seeds
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    confirmedOffer: {
      type: DataTypes.INTEGER,
      references: {
        model: 'seedoffers',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'emailOffer',
  }
);

module.exports = EmailOffer;
