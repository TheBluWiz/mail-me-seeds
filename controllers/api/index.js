const router = require("express").Router();

const userAction = require("./userActions");

router.use("/userAction", userAction);

module.exports = router;
