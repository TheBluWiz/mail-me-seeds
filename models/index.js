const User = require('./User');
const SeedOffers = require('./SeedOffers');
const SeedWishes = require('./SeedWishes');
const EmailReset = require('./EmailReset')

User.hasMany(SeedOffers, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

SeedOffers.belongsTo(User, {
  foreignKey: "user_id"
});

User.hasMany(SeedWishes,{
  foreignKey: "user_id",
  onDelete: 'CASCADE'
} )

SeedWishes.belongsTo(User,{
  foreignKey: "user_id"
} )

module.exports = { User, SeedOffers, SeedWishes };