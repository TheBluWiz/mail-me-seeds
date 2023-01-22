const router = require("express").Router();
const { SeedRequests, User, SeedOffers } = require("../models");
const { withAuth } = require("../utils")

//localhost3001:/offers/

router.get("/request", withAuth, async (req, res) => {
  const requestData = await SeedRequests.findAll({
    where: {
      user_id: req.session.id,
    },
  });
  const data = {
    loggedIn: req.session.loggedIn,
    personalRequests: requestData.map((requests) =>
      requests.get({ plain: true })
    ),
  };
  res.render("request", { data });
});

router.get("/myoffers", withAuth, async (req, res) => {
  console.log(`UserID: ${JSON.stringify(req.session.userID)}\n\n`);
  const myOffersData = await SeedOffers.findAll({
    where: {
      user_id: req.session.userID,
    },
  });
  console.log(`Offer Data: ${JSON.stringify(myOffersData)}\n\n`);
  const data = {
    loggedIn: req.session.loggedIn,
    myOffers: myOffersData.map((offers) => offers.get({ plain: true })),
  };
  console.log(`Data: ${JSON.stringify(data)}\n\n`);
  res.render("myoffers", { data });
});

// This is not yet complete
router.get("/checkRequests/:myOffer", withAuth, async (req, res) => {
  const requestData = await SeedOffers.findOne({
    where: {
      weblink: req.params.myOffer,
    },
  });
  console.log(`\n\nRequest Data: ${JSON.stringify(requestData.id)}\n\n`);

  const seedRequests = await SeedRequests.findAll({
    where: {
      seedoffers_id: requestData.id,
    },
  });

  console.log(`\n\nSeed Requests:\n${JSON.stringify(seedRequests)}`);

  let users = [];
  seedRequests.forEach((element) => {
    console.log(JSON.stringify(element));
    console.log(element.user_id);
		users.push(element.user_id)
  });

	console.log(`\n\nusers:\n${users}`)

	userData = await User.findAll({
		where: {
			id: users
		}
	})

	users = userData.map((user) => user.get({ plain: true }))

	console.log(`\n\nUserData:\n${JSON.stringify(users)}`)

	let sanitizedUsers = []
	users.forEach(user => {
		requester = {
			username: user.username,
			mailing: user.mailing,
			userID: user.id
		}
		sanitizedUsers.push(requester)
	});

	console.log(`\n\nsanitiedUsers:\n${JSON.stringify(sanitizedUsers)}`)

  const data = {
    loggedIn: req.session.loggedIn,
		weblink: req.params.myOffer,
		userRequests: sanitizedUsers
  };
	console.log(`\n\nweblink: ${data.weblink}\n\n`)
  res.render("checkRequests", { data });
});

router.get("/form", withAuth, async (req, res) => {
  const data = {
    loggedIn: req.session.loggedIn,
  };
  res.render("offerform", { data });
});

// router.get("/comments", async (req, res) => {
//     res.render("comment");
// })

module.exports = router;
