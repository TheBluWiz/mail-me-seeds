const sequelize = require('../config/connection');
const { Seeds, User } = require('../models');

const userData = require('./userData.json');
const seedsData = require('./seedsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const seed of seedsData) {
    await Seeds.create({
      ...seed,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();