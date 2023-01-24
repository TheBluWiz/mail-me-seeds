const router = require("express").Router();
const { SeedRequests, User, SeedOffers } = require("../models");
const { withAuth } = require("../utils");

//MY SEED REQUESTS
//----------------------------------------------------------------------------------------------
//localhost3001:/offers/request
//Trying to find and render the seed requests (offers from another user)
router.get("/request", withAuth, async (req, res) => {
	console.log(
		`\n\n HEY, YOU JUST LOADED THE "My Seed Requests" page, and THIS IS YOUR UserID ${JSON.stringify(
			req.session.userID //console logs the logged on user's ID from the session
		)}\n\n`
	);
	//finds all the SeedRequest objects in the entire database that have matching user ID's and gives them to seedRequestData
	const seedRequestsData = await SeedRequests.findAll({
		where: {
			user_id: req.session.userID,
		},
	});
	console.log(
		`\n\n HEY YO!!! Here is that Seed REquest Data!!!! \n \n \n ${JSON.stringify(
			seedRequestsData
		)}`
	);
	//we just want the offers ID's for all the requests so we can go find the titles and descriptions etc. later in seedOffers table
	const offersIDArray = []; //this array is about to hold the relevant offers ID's
	seedRequestsData.forEach((seedReq) => {
		//naming each part of seedRequestData collection "seedReq"
		offersIDArray.push(seedReq.seedoffers_id); //pushing each seedReq's seedoffers_id into the offersIDArray.
	});
	console.log(
		`\n\n these are all the seeds offers that you requested!!!!! ${JSON.stringify(
			offersIDArray
		)}` //console logging that amazing offersIDArray
	); //in console: these are all the seeds offers!!!!! [1,2,3,4,5,6]  //(these are the IDs of the offers from all users)
	//use the findOne method repeatedly to collect all the matching offers and put them into offersDataArray
	const offersDataArray = [];
	for (let i = 0; i < offersIDArray.length; i++) {
		let offerID = offersIDArray[i];
		const offer = await SeedOffers.findOne({
			where: {
				id: offerID,
			},
		});
		offersDataArray.push(offer);
	}
	console.log(
		`\n\n HERE IS THE OFFERS ARRAY AKA offersDataArray ${JSON.stringify(
			offersDataArray
		)} \n\n\n` // HERE IS THE OFFERS ARRAY AKA offersDataArray [{"id":1,"webLink":"33333","seedName":"Speckled Lettuce","offerDescription":"This is an unopned pack of lettuce seeds. I don't...}...
	);
	const data = {
		loggedIn: req.session.loggedIn, //a boolean , keep this
		//make a new key value pair in data called "wantedOffer" and program handlebars to us an "each" on it.
		wantedOffers: offersDataArray.map((offers) => offers.get({ plain: true })),
	};
	res.render("request", { data });
});

//----------------------------------------------------------------------------------------------

//MY SEED OFFERS- SEEDS I'M OFFERING TO OTHER GARDENERS
//----------------------------------------------------------------------------------------------
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
	console.log(
		`\n\n HEY RHYS, these are the seeds you are offering to other Gardeners!!! Data: ${JSON.stringify(
			data
		)}\n\n`
	);
	res.render("myoffers", { data });
	//----------------------------------------------------------------------------------------------
});

router.get("/checkRequests/:myOffer", async (req, res) => {
	const requestData = await SeedOffers.findOne({
		where: {
			weblink: req.params.myOffer,
		},
	});
	console.log(`\n\nRequest Data: ${JSON.stringify(requestData.id)}\n\n`);

	const seedRequests = await SeedRequests.findAll({
		where: {
			seedoffers_id: requestData.id,
			sent: false,
		},
	});

	console.log(`\n\nSeed Requests:\n${JSON.stringify(seedRequests)}`);

	let users = [];
	seedRequests.forEach((element) => {
		console.log(JSON.stringify(element));
		console.log(element.user_id);
		users.push(element.user_id);
	});

	console.log(`\n\nusers:\n${users}`);

	userData = await User.findAll({
		where: {
			id: users,
		},
	});

	users = userData.map((user) => user.get({ plain: true }));

	console.log(`\n\nUserData:\n${JSON.stringify(users)}`);

	let sanitizedUsers = [];
	users.forEach((user) => {
		requester = {
			username: user.username,
			mailing: user.mailing,
			userID: user.id,
		};
		sanitizedUsers.push(requester);
	});

	console.log(`\n\nsanitiedUsers:\n${JSON.stringify(sanitizedUsers)}`);

	const data = {
		loggedIn: req.session.loggedIn,
		weblink: req.params.myOffer,
		userRequests: sanitizedUsers,
	};
	// console.log(`\n\nweblink: ${data.weblink}\n\n`);
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
