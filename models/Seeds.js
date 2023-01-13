const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Seeds extends Model {}

Seeds.init(
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
/**Maybe have a description spot and image area? */
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
    modelName: 'Seeds',
  }
);

module.exports = Seeds;
