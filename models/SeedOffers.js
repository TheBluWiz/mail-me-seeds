const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SeedOffers extends Model {}

SeedOffers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
   seedName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    offerPostDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    offerDescription: {
      type: DataTypes.STRING,
    },
    seedCount : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /**Maybe have image area? */
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "seedoffers",
  }
);

module.exports = SeedOffers;
