const express = require('express');
const { checkToken } = require('../middlewares/auth.middleware');
const { 
  getTalkers,
  getTalkerById,
  insertTalker,
} = require('../middlewares/talker.middleware');

const router = express.Router();

router.get('/', getTalkers);

router.get('/:id', getTalkerById);

router.use(checkToken);

router.post('/', insertTalker);

module.exports = router;