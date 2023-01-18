const sequelize = require('../config/connection');
const { SeedOffers, User } = require('../models');

const userData = require('./userData.json');
const seedsData = require('./seedsData.json');
const requestsData = require('./requestsData.json');
const SeedRequests = require('../models/SeedRequests');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const seed of seedsData) {
    await SeedOffers.create({
      ...seed,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const request of requestsData) {
    await SeedRequests.create({
      ...request,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();