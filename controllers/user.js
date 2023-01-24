const router = require("express").Router();
const { EmailReset, User } = require("../models");
const { withAuth } = require("../utils");

//localhost3001:/user/  //note: user, It's not plural!
//these routes are for delivering account related views to the user in the URL
router.get("/", async (req, res) => {
	res.render("login"); // renders login.handlebars
});

router.get("/logout", async (req, res) => {
	req.session.destroy();
	res.render("login");
});

router.get("/confirm", async (req, res) => {
	res.render("confirm");
});

router.get("/create-acct", async (req, res) => {
	res.render("create-acct");
});

router.get("/mailing", withAuth, async (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn,
	};
	res.render("mailing", { data });
});

router.get("/dashboard", async (req, res) => {
	data = {
		loggedIn: req.session.loggedIn,
		username: req.session.username
	};
	res.render("dashboard", { data, layout: "nodashbutton" });
});

router.get("/resetpassword", async (req, res) => {
	res.render("resetpass");
});

router.get("/reset-message", async (req, res) => {
	data = {
		loggedIn: req.session.loggedIn,
	};
	res.render("reset-message", { data });
});

router.get("/updateEmail", async (req, res) => {
	data = {
		loggedIn: req.session.loggedIn,
	};
	res.render("updateEmail", { data });
});

router.get("/updatepassword/:resetLink", async (req, res) => {
	const resetRequest = await EmailReset.findOne({
		where: {
			resetLink: req.params.resetLink,
		},
	});
	if (resetRequest !== null) {
		const data = {
			resetLink: req.params.resetLink,
		};

		console.log(data);
		return res.render("create-np", data);
	}
	res.render("expired-link");
});

router.get("/updateEmail", withAuth, async (req, res) => {
	data = {
		loggedIn: req.session.loggedIn,
	};
	res.render("updateEmail", { data });
});

router.get("/account", withAuth, async (req, res) => {
	data = {
		loggedIn: req.session.loggedIn,
		userid: req.session.userID,
	};
	res.render("account", { data });
});

module.exports = router;
