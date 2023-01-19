const sequelize = require("../config/connection");
const { SeedOffers, User, SeedRequests, EmailReset } = require("../models");

const userData = require("./userData.json");
const seedsData = require("./seedsData.json");
const requestsData = require("./requestsData.json");
// const emailData = require("./emailData")
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
  //Doesnt work the way i want it too \/
  // const requests = await SeedRequests.bulkCreate(requestsData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  //Seeds SeedRequests to database and applies a user_id at random
  for (const request of requestsData) {
    await SeedRequests.create({
      ...request,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // for (const emailReset of )

  process.exit(0);
};

seedDatabase();
