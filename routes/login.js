const express = require('express');

const loginMiddleware = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/', loginMiddleware);

module.exports = router;
