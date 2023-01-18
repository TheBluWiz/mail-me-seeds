const router = require("express").Router();

router.post("/signUp", async (req, res) => {
	console.log("signup has been attempted");
	console.log(req.body);
	//make sure email is unique
	//create a user
	try {
		const userData = await User.create(req.body);
		req.session.save(() => {});
	} catch (err) {}
});

//login
//create account
//reset password
//create a new password
//post requesting seeds at main page
//post offers of seeds
//delete requests
//put  seeds have arrived

module.exports = router;