const User = require("./User");
const SeedOffers = require("./SeedOffers");
const SeedRequests = require("./SeedRequests");
const EmailReset = require("./EmailReset");
// const EmailOffer = require('./EmailOffer')

User.hasMany(SeedOffers, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

SeedOffers.belongsTo(User, {
	foreignKey: "user_id",
});

User.hasMany(SeedRequests, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

SeedRequests.belongsTo(User, {
	foreignKey: "user_id",
	foreignKey: "seedoffers_id",
});

SeedOffers.hasMany(SeedRequests, {
	foreignKey: "seedoffers_id",
	//onDelete: "CASCADE",
});

SeedRequests.belongsTo(SeedOffers, {
	foreignKey: "seedoffers_id",
	//onDelete: "CASCADE",
});

User.hasMany(EmailReset, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

EmailReset.belongsTo(User, {
	foreignKey: "user_id",
});

// User.hasMany(EmailOffer, {
//   foreignKey: 'user_id',
//   foreignKey: 'confirmedOffer',
//   onDelete: 'CASCADE'
// })

// EmailOffer.belongsTo(User, {
//   foreignKey: 'confirmedOffer'
// })

module.exports = { User, SeedOffers, SeedRequests, EmailReset };
