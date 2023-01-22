const router = require("express").Router();

const userActions = require("./userActions");
const mailService = require("./mailService")
const offerUpdates = require("./offerUpdates")

router.use("/userActions", userActions);
router.use("/mailService", mailService);
router.use("/offerUpdates", offerUpdates);

module.exports = router;
