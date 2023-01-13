const router = require('express').Router();
const passwordReset = require('./reset');

router.use('/passwordReset', passwordReset)