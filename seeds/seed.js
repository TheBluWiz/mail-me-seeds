const sequelize = require("../config/connection");
const { SeedOffers, User, SeedRequests } = require("../models");

const userData = require("./userData.json");
const seedsData = require("./seedsData.json");
const requestsData = require("./requestsData.json");
// const SeedRequests = require('../models/SeedRequests');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  //Seeds users to database
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  //Seeds SeedOffers to database and applies a user_id at random
  for (const seedOffer of seedsData) {
    await SeedOffers.create({
      ...seedOffer,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // const requests = await SeedRequests.bulkCreate(requestsData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  for (const request of requestsData) {
    await SeedRequests.create({
      ...request,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    
  }

  process.exit(0);
};

seedDatabase();
