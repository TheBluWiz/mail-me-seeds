const router = require("express").Router();
const { User } = require("../../models");
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
			console.log("Creating Unique User"); //This is not console logging for some reason!
			try {
				//deleted the newuser const because the req.body is literally the new user object
				const userData = await User.create(req.body); //req.body has username email and password per the const signUpData in createAccount.js
				console.log(userData);
				req.session.save(() => {
					//cookie session
					req.session.login = true; //user just logged in
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

//USER LOGIN
//posting to /api/userActions/login
//form is in the URL view at http://localhost:3001/user/
router.post("/login", async (req, res) => {
	console.log(req.body);
	console.log(`Attempting login:\n`); //This console logs when you post to "/api/userActions/login" but then nothing
	try {
		const requestedUser = await User.findOne({
			where: {
				email: req.body.email.trim(), //finds one user where the email is the email from the req.body
			},
		});
		if (!requestedUser) {
			return res.status(400).json({ message: "No user found" });
		}
		const validUser = requestedUser.checkPassword(req.body.password);
		if (!validUser) {
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

module.exports = router;

//post requesting seeds at main page

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
