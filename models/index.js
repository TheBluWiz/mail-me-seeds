const User = require('./User');
const SeedOffers = require('./SeedOffers');
const SeedRequests = require('./SeedRequests');
const EmailReset = require('./EmailReset')
// const EmailReset = require('./EmailReset')

User.hasMany(SeedOffers, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

SeedOffers.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(SeedRequests,{
  foreignKey: "user_id",
  onDelete: 'CASCADE'
} )

SeedRequests.belongsTo(User,{
  foreignKey: "user_id",
  foreignKey: 'seedoffers_id'
} )

SeedOffers.hasMany(SeedRequests, {
  foreignKey: 'seedoffers_id',
  onDelete: "CASCADE"
} )

SeedRequests.belongsTo(SeedOffers, {
  foreignKey: 'seedoffers_id',
})


module.exports = { User, SeedOffers, SeedRequests };
