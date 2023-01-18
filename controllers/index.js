const router = require("express").Router();

const apiRoutes = require("./api");
const viewRoutes = require("./viewRoutes");

router.use("/", viewRoutes); //using the default localhost 3001
router.use("/api", apiRoutes);

module.exports = router;

// router.use("/addpost", addpostRoutes);
// router.use("/allposts", allpostsRoutes);
// router.use("/comment", commentRoutes);
// router.use("/homepage", homepageRoutes);
// router.use("/mailing", mailingRoutes);
// router.use("/mainpage", mainpageRoutes);
// router.use("/reviewallposts", reviewallpostsRoutes);
// router.use("/signup", signupRoutes);
