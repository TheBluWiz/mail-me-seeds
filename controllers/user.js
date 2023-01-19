const router = require("express").Router();
const { EmailReset, User } = require("../models");
const { findOne } = require("../models/User");

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

router.get("/mailing", async (req, res) => {
  const data = {
    loggedIn: req.session.loggedIn,
  };
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

router.get("/updatepassword/:resetLink", async (req, res) => {
  try {
    const resetRequest = await EmailReset.findOne({
      where: {
        resetLink: req.params.resetLink,
      },
    });

    const data = {
      resetLink: req.params.resetLink,
    };

    console.log(data);
    res.render("create-np", data);
  } catch (err) {
    console.log(err);
    res.render("expired-link");
  }
});

router.get("/account", async (req, res) => {
  res.render("construction");
});

module.exports = router;
