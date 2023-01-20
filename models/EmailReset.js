const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class EmailReset extends Model {}

EmailReset.init(
  {
    resetLink: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      isUnique: true
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
