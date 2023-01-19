const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class EmailReset extends Model {}

EmailReset.init(
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
    timestamps: true,
    freezeTableName: true,
    // underscored: true,
    modelName: 'emailReset',
  }
);

module.exports = EmailReset;
