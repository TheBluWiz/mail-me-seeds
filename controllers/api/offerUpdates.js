const router = require("express").Router();
const { request } = require("express");
const { SeedRequests, SeedOffers, User } = require("../../models");
const { theFerryman, linkGenerator } = require("../../utils");

router.delete("/offers", async (req, res) => {
	try {
		if (req.session.loggedIn) {
			const offer = await SeedOffers.findOne({
				where: {
					user_id: req.session.userID,
					id: req.body.offerID,
				},
			});
			const requests = await SeedRequests.findAll({
				where: {
					seedoffers_id: offer.id,
				},
			});
			console.log(`\n\n requests: ${requests}`);
			//destroys all the requests belonging to the offer before destroying the offer
			if (requests.length > 0) {
				console.log(`n\n\ if statement successful!! `);
				requests.forEach((request) => {
					console.log(`\n\n LOGGIN IN THE LOOP`);
					request.destroy();
				});
			}
			console.log(`\n\n ABOUT TO DESTROY OFFER`);
			offer.destroy();
		}

		res.status(200);
	} catch (err) {
		console.log(err);
		res.status(404);
	}
});

router.delete("/request", async (req, res) => {
	try {
		if (req.session.loggedIn) {
			const request = await SeedRequests.findOne({
				where: {
					user_id: req.session.userID,
					seedoffers_id: req.body.offerID,
				},
			});
			request.destroy();
		}
		res.status(200);
	} catch (err) {
		res.status(404);
	}
});

router.post("/requestSeed", async (req, res) => {
	if (!req.session.loggedIn) {
		return res.status(500);
	}
	const requests = await SeedRequests.findAll({
		where: {
			user_id: req.session.userID,
			seedoffers_id: req.body.seedID,
		},
	});
	if (requests.length > 0) {
		console.log("Request already exists");
		return res.status(400).json({ message: "Already Requested" });
	}
	try {
		console.log(`Building Request\n\n`);
		const request = {
			user_id: req.session.userID,
			seedoffers_id: req.body.seedID,
		};
		const successfulRequest = await SeedRequests.create(request);

		try {
			console.log(
				`Seed Offer: ${JSON.stringify(successfulRequest.seedoffers_id)}`
			);
			const offer = await SeedOffers.findOne({
				where: {
					id: Number(successfulRequest.seedoffers_id),
				},
			});
			console.log(`Here is the offer${JSON.stringify(offer)}`);

			const user = await User.findOne({
				where: {
					id: offer.user_id,
				},
			});
			owner = {
				name: user.dataValues.username,
				email: user.dataValues.email,
			};

			// This part not finished
			console.log(owner);
			const delivery = await theFerryman(owner, "request", offer.webLink);
			console.log(delivery);
			res.status(200);
		} catch (err) {
			console.log(err);
		}
	} catch (err) {
		console.log(`Request Failed`);
		console.log(err);
		res.status(500).json({ message: "Request Failed" });
	}
});

router.post("/newOffer", async (req, res) => {
	try {
		const newOffer = {
			seedName: req.body.seedName,
			offerDescription: req.body.offerDescription,
			user_id: req.session.userID,
		};
		console.log(`\n\nNew Offer${JSON.stringify(newOffer)}`);

		let uniqueLink = false;
		while (!uniqueLink) {
			let newLink = linkGenerator();
			uniqueLink = await SeedOffers.findOne({
				where: {
					webLink: newLink,
				},
			});
			if (uniqueLink === null) uniqueLink = newLink;
		}
		newOffer.webLink = uniqueLink;

		const postedOffer = await SeedOffers.create(newOffer);
		res.status(200).json({ message: "Offer Posted" });
	} catch (err) {
		console.log(err);
		res.status(500);
	}
});

router.post("/seedsMailed", async (req, res) => {
	console.log(`\n\nData:\n${JSON.stringify(req.body)}`);

	const userData = await User.findOne({
		where: {
			id: req.body.requestUserID,
		},
	});
	console.log(`\n\nData:\n${JSON.stringify(userData)}`);

	const user = {
		name: userData.username,
		email: userData.email,
	};

	await theFerryman(user, "shipping", req.body.webLink);

	const seedOffer = await SeedOffers.findOne({
		where: {
			webLink: req.body.webLink,
		},
	});

	console.log(`\n\nSeed Offer:\n${JSON.stringify(seedOffer)}`);

	const seedRequest = await SeedRequests.findOne({
		where: {
			user_id: req.body.requestUserID,
			seedoffers_id: seedOffer.id,
		},
	});

	seedRequest.sent = true;
	seedRequest.save();

	res.status(200);
});

module.exports = router;
