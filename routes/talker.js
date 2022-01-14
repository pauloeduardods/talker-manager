const express = require('express');
const getTalker = require('../middlewares/getTalker');

const router = express.Router();

router.get('/', getTalker);

// router.get('/:id', getTalkerById);

module.exports = router;