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
    offerDescription: {
      type: DataTypes.STRING,
    },
    webLink: {
      type: DataTypes.STRING,
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
