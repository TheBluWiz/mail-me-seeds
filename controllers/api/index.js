const router = require("express").Router();
const userRoutes = require("./userRoutes"); //logon logout sign up
const offerRoutes = require("./offerRoutes");

router.use("/users", userRoutes);
router.use("/offers", offerRoutes);

module.exports = router;
