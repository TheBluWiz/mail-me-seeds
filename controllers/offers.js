const router = require("express").Router();
const { SeedRequests, User, SeedOffers } = require('../models')

//localhost3001:/offers/

router.get("/request", async (req, res) => {
	const requestData = await SeedRequests.findAll({
		where: {
			user_id: req.session.id
		}
	})
	const data = {
		loggedIn: req.session.loggedIn,
		personalRequests: requestData.map((requests) => requests.get({ plain: true }))
	}
	res.render("request", { data });
});

router.get("/myoffers", async (req, res) => {
	const myOffersData = await SeedOffers.findAll({
		where: {
			user_id: req.session.id
		}
	})
	const data = {
		loggedIn: req.session.loggedIn,
		myOffers: myOffersData.map((offers) => offers.get({ plain: true }))
	}
	res.render("myoffers", { data });
});

router.get("/form", async (req, res) => {
	res.render("offerform");
});

// router.get("/comments", async (req, res) => {
//     res.render("comment");
// })

module.exports = router;
