const router = require("express").Router();

const userActions = require("./userActions");
const mailService = require("./mailService")

router.use("/userActions", userActions);
router.use("/mailService", mailService);

module.exports = router;
