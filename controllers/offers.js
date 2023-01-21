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
	console.log(`UserID: ${JSON.stringify(req.session.userID)}\n\n`)
	const myOffersData = await SeedOffers.findAll({
		where: {
			user_id: req.session.userID
		}
	})
	console.log(`Offer Data: ${JSON.stringify(myOffersData)}\n\n`)
	const data = {
		loggedIn: req.session.loggedIn,
		myOffers: myOffersData.map((offers) => offers.get({ plain: true }))
	}
	console.log(`Data: ${JSON.stringify(data)}\n\n`)
	res.render("myoffers", { data });
});

// This is not yet complete
router.get("/checkRequests/:myOffer", async (req, res) => {
	const requestData = await SeedRequests.findAll({
		where: {
			seedoffers_id: req.params.myOffer
		}
	})
	console.log(`\n\nRequest Data: ${JSON.stringify(requestData)}\n\n`)

	const requests = requestData.map((request) => request.get({ plain: true }))
	console.log(`\n\nRequests: ${JSON.stringify(requests)}\n\n`)
	const users = []
	// requests.forEach(request => {
		
	// });

	const data = {
		loggedIn: req.session.loggedIn,
	}
	res.render("checkRequests", { data })
})

router.get("/form", async (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn,
	}
	res.render("offerform", { data });
});

// router.get("/comments", async (req, res) => {
//     res.render("comment");
// })

module.exports = router;
