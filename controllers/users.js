const router = require("express").Router();

//localhost3001:/users/
//these routes are for things that users do that are related to their account existing
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
	res.render("mailing");
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
