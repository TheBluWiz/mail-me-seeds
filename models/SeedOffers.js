const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SeedOffers extends Model {}

SeedOffers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    webLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seedName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    offerDescription: {
      type: DataTypes.STRING,
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
    timestamps: true,
    freezeTableName: true,
    // underscored: true,
    modelName: "seedOffers",
  }
);

module.exports = SeedOffers;
