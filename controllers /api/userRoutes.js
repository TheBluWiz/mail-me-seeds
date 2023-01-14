const router = require("express").Router();
const { User } = require("../../models");

//USER CREATION
router.post("/", async (req, res) => {
	//"a single forward slash evaluates to "localhost3001/api/users/"
	//when a user is looking at a password and user name fields in the browser, hit submit, this route is executed.
	//the content of that form is sent in the request body.
	try {
		const userData = await User.create(req.body); //user name and password are in the request body
		//sequelize is using the create method to create a user using the contents of the req.body
		req.session.save(() => {
			//this is creating a cookie to send to the client
			req.session.user_id = userData.id; //saved in cookie
			req.session.logged_in = true; //saved in cookie

			res.status(200).json(userData); //user data sent back to the browser (id, name, password)
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

//USER LOGIN
router.post("/login", async (req, res) => {
	//localhost3001/api/users/login
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		if (!userData) {
			res
				.status(400)
				.json({ message: "Incorrect email or password, please try again" });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password); //notice validPassword is a boolean
		//userData is what we named the current user, any user can use the checkPassword method
		if (!validPassword) {
			res
				.status(400)
				.json({ message: "Incorrect email or password, please try again" }); //returns a response body
			return;
		}

		req.session.save(() => {
			//save is a method of the session object , calling "save" on the session object
			req.session.user_id = userData.id; //tells "session" that it now has a user id that is what it is
			req.session.logged_in = true; //tells "session" that it has a true logged in value

			res.json({ user: userData, message: "You are now logged in!" }); //server gives client a response object which is user data and a message
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

//USER LOGOUT
router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		//more logic done on a request body
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
