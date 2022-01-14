const express = require('express');
const getTalker = require('../middlewares/getTalker');
const getTalkerById = require('../middlewares/getTalkerById');

const router = express.Router();

router.get('/', getTalker);

router.get('/:id', getTalkerById);

module.exports = router;