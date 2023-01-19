const router = require("express").Router();
const { SeedOffers } = require("../models");

//these are the things we need for the program to run //these are file paths
// const apiRoutes = require("./api");
const offerRoutes = require("./offers");
const userRoutes = require("./users");
const apiRoutes = require("./api");

//this is where our program actually happens //These paths are actual URL paths
// router.use("/api", apiRoutes);
router.use("/offers", offerRoutes); //using the default localhost 3001
router.use("/user", userRoutes);
router.use("/api", apiRoutes);

//on page load a visitor will see our main page that shows all the seeds that could be theirs!

//sends this router to the server.js
router.get("/", async (req, res) => {
  const currentOffersData = await SeedOffers.findAll();
  const data = {
    loggedIn: req.session.loggedIn,
  };
  if (currentOffersData)
    data.currentOffers = currentOffersData.map((offer) =>
      offer.get({ plain: true })
    );
  res.render("mainpage", { data });
});

module.exports = router;
