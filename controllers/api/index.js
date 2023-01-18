const router = require("express").Router();

const userActions = require("./userActions");

router.use("/userActions", userActions);

module.exports = router;
