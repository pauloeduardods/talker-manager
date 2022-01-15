const rescue = require('express-rescue');
const {
  getTalkers: readTalkers,
  getTalkerById: readTalkerById,
  insertTalker: writeTalker,
} = require('../utils/talkers');

const getTalkers = rescue(async (_req, res) => {
  const talker = await readTalkers();
  res.status(200).json(talker);
});

const getTalkerById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const talker = await readTalkerById(id);
  if (talker) {
    return res.status(200).json(talker);
  }
  next({ status: 404, message: 'Pessoa palestrante não encontrada' });
});

// const checkValidTalker = rescue(async (req, res, next) => {
//   const { name, age, talk: { watchedAt, rate } } = req.body;

const insertTalker = rescue(async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    name,
    age,
    talk: { watchedAt, rate },
  };
  const newTalkerRes = await writeTalker(newTalker);
  return res.status(201).json(newTalkerRes);
});

module.exports = {
  getTalkers,
  getTalkerById,
  insertTalker,
};