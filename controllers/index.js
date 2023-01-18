const router = require("express").Router();

//these are the things we need for the program to run //these are file paths
const apiRoutes = require("./api");
const offerRoutes = require("./offers");
const userRoutes = require("./user");

//this is where our program actually happens //These paths are actual URL paths
router.use("/api", apiRoutes);
router.use("/offers", offerRoutes); //using the default localhost 3001
router.use("/user", userRoutes);

//on page load a visitor will see our main page that shows all the seeds that could be theirs!

//sends this router to the server.js
router.use("/", async (req, res) => {
	res.render("mainpage");
});

module.exports = router;

// router.use("/addpost", addpostRoutes);
// router.use("/allposts", allpostsRoutes);
// router.use("/comment", commentRoutes);
// router.use("/homepage", homepageRoutes);
// router.use("/mailing", mailingRoutes);
// router.use("/mainpage", mainpageRoutes);
// router.use("/reviewallposts", reviewallpostsRoutes);
// router.use("/signup", signupRoutes);
