const router = require("express").Router();

//localhost3001:/user/  //note: user, It's not plural!
//these routes are for delivering account related views to the user in the URL
router.get("/", async (req, res) => {
	res.render("login"); // renders login.handlebars
});

router.get("/confirm", async (req, res) => {
	res.render("confirm");
});

router.get("/create-acct", async (req, res) => {
	res.render("create-acct");
});

router.get("/mailing", async (req, res) => {
	const data = {
		loggedIn: req.session.loggedIn
	}
	res.render("mailing", { data });
});

router.get("/dashboard", async (req, res) => {
	res.render("dashboard");
});

router.get("/resetpassword", async (req, res) => {
	res.render("resetpass");
});

router.get("/reset-message", async (req, res) => {
	res.render("reset-message");
});

router.get("/updatepassword", async (req, res) => {
	res.render("create-np");
});

module.exports = router;
