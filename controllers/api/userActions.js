const router = require("express").Router();
const { User, SeedRequests } = require("../../models");
const bcrypt = require("bcrypt");

//USER SIGN UP
// this is the back end, information will come from the front end at /user/create-acct
router.post("/signUp", async (req, res) => {
	console.log("signup has been attempted");
	console.log(req.body); //This console logs fine
	try {
		let userUnique = await User.findOne({
			where: {
				email: req.body.email.trim(),
			},
		});
		if (userUnique === null) {
			console.log("Creating Unique User");
			try {
				//deleted the newuser const because the req.body is literally the new user object
				const userData = await User.create(req.body); //req.body has username email and password per the const signUpData in createAccount.js //userData is a new class "User" object
				console.log(userData);
				req.session.save(() => {
					//cookie session
					req.session.loggedIn = true; //user just logged in
					req.session.username = userData.username; //handed from userData
					req.session.userID = userData.id; //created by autoincrement in db after the creation
					res.status(200).json({ message: "Login Successful" }); //response goes back to front end
				});
			} catch (err) {
				console.log(`User creation failed:\n\n`);
				console.log(err);
			}
		} else {
			return res.status(500).json({ message: "This user already exists" });
		}
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

router.put('/updateMailing', async (req, res) => {
	console.log('Attempting Mailing Address Update..')
	console.log(`Body:\n\n${req.body}`)
	console.log(`Session:\n\n${req.session}`)
	try{
		const user = await User.findOne({
			where: {
				id: req.session.userID
			}
		})
		try {
			user.mailing = req.body.mailing
			await user.save();
			res.status(200).json({ message: "Address Updated"})
		}
		catch {
			res.status(500).json({ message: "Failed to update Address"})
		}
	}
	catch (err) {
		console.log(err)
		res.status(400).json({ message: "User Not Found"})
	}
})

//USER LOGIN
//posting to /api/userActions/login
//form is in the URL view at http://localhost:3001/user/
router.post("/login", async (req, res) => {
	console.log(req.body);
	console.log(`Attempting login:\n`);
	try {
		const requestedUser = await User.findOne({
			where: {
				email: req.body.email.trim(), //finds one user where the email is the email from the req.body
			},
		});
		console.log(requestedUser)
		if (!requestedUser) {
			console.log("User not Found!")
			return res.status(400).json({ message: "No user found" });
		}
		const validUser = requestedUser.checkPassword(req.body.password);
		if (!validUser) {
			console.log("Wrong Password!")
			return res.status(400).json({ message: "Incorrect Password" });
		}
		req.session.save(() => {
			req.session.login = true;
			req.session.username = requestedUser.username;
			req.session.userID = requestedUser.id;

			return res.status(200).json({ message: "Log In Successful" }); //res is sent to login.js
		});
	} catch (err) {
		console.log(err);
		return res.status(404).json(err);
	}
});

//post requesting seeds at main page
//the request body will be a Seed Request (or maybe multiple seedRequest))
//using this example seedRequest as the request body works in insomnia
// {
//     "requestedSeed": 3,
//     "seedoffers_id": 2
//   }
//localhost:3001/api/userActions/seedRequest
router.post("/seedRequest", async (req, res) => {
	console.log("a seed request has been attempted");
	console.log(req.body); //should be an object of seedOffer objects
	try {
		const wantedSeeds = await SeedRequests.create({
			...req.body, //spread operator, makes an array from the object...basically
			user_id: req.session.user_id, //
		});

		res.status(200).json(wantedSeeds);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;

//post offers of seeds
//SeedOffers.create
//    /api/userActions/createOffer/

//delete requests
//  /api/userActions/deleteOffer/
// seedsoffer.destroy

//put  seeds have arrived
//SeedRequest find one and update

//reset password
//save for last

//create a new password
//save for last
