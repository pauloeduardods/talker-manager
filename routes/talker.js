const express = require('express');
const { checkToken } = require('../middlewares/auth.middleware');
const { 
  getTalkers,
  getTalkerById,
  insertTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
} = require('../middlewares/talker.middleware');

const router = express.Router();

router.get('/', getTalkers);

router.get('/search', checkToken, searchTalker);

router.get('/:id', getTalkerById);

router.use(checkToken);

router.post('/', insertTalker);

router.put('/:id', updateTalker);

router.delete('/:id', deleteTalker);

module.exports = router;