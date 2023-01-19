const router = require("express").Router();
const { EmailReset, User } = require("../../models");
const { theFerryman, linkGenerator } = require("../../utils");

router.post("/resetPassword", async (req, res) => {
	let uniqueLink = false;
	while (!uniqueLink) {
		let newLink = linkGenerator();
		uniqueLink = await EmailReset.findOne({
			where: {
				resetLink: newLink,
			},
		});
		if (uniqueLink === null) uniqueLink = newLink;
	}
	try {
		requestedUser = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		resetRequest = {
			resetLink: uniqueLink,
			user_id: requestedUser.id,
		};
		user = {
			name: requestedUser.name,
			email: req.body.email,
		};
		const logRequest = await EmailReset.create(resetRequest);
		if (logRequest) {
			await theFerryman(user, "password", uniqueLink);
			return res.status(200).json({ message: "Request Sent" }); // client should redirect to 'ResetEmail'
		}
		res.status(500).json({ message: "Reset Request Failed" });
	} catch (err) {
		console.log(err);
		res.render("ResetEmail"); // need view for If email exists, reset link sent
	}
});

// potentially save email in cookie and verify that the User with id user_id has matching email before executing the following code.
router.put('/create-np/:link', async (req, res) => {
  try {
    const resetUser = await EmailReset.findOne({
      where: {
        resetLink: req.params.link
      }
    });
    const updatedUser = await User.findOne({
      where: {
        id: resetUser.user_id
      }
    })
  
    updatedUser.set({
      password: req.body.password
    });
  
    await EmailReset.destroy({
      where: {
        resetLink: req.params.link
      }
    })
  
    await updatedUser.save();
    res.status(200).json({ message: "Password Reset"}); // client should redirect to log in
  }
  catch (err) {
    res.render('linkExpired') // need view for expired reset link
  }
})

router.post('/offerRequest', async (req, res) => {
  console.log(`Seeds Requested ${req.body}`)
  res.status(200).json({ message: "Email Sent"})
})

module.exports = router;
//will potentially want to add a method that deletes links from service if they are older than time period. Perhaps 10 minutes?
