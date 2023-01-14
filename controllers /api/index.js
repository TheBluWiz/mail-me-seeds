const router = require("express").Router();
const userRoutes = require("./userRoutes"); //logon logout sign up
const offerRoutes = require("./offerRoutes");
const passwordReset = require('./reset');

router.use("/users", userRoutes);
router.use("/offers", offerRoutes);
router.use('/passwordReset', passwordReset)

module.exports = router;
