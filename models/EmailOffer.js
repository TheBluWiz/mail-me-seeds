const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class EmailOffer extends Model {}
// will Not using this table ATM
EmailOffer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    resetlink: {
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
        model: 'seedOffers',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true, /**This makes the keys( id, resetLink etc, ) at database level look like reset_link rather than what is shown in current model > resetlink*/
    modelName: 'emailOffer',
  }
);

module.exports = EmailOffer;
