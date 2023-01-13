const User = require('./User');
const SeedOffers = require('./SeedOffers');

User.hasMany(SeedOffers, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

SeedOffers.belongsTo(User, {
  foreignKey: "user_id"
});

module.exports = { User, SeedOffers };