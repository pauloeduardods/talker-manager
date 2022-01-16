const rescue = require('express-rescue');
const {
  getTalkers: readTalkers,
  getTalkerById: readTalkerById,
  insertTalker: writeTalker,
  updateTalkerById,
  deleteTalkerById,
  searchTalkerByName,
} = require('../utils/talkers');

const talkerNotFound = { status: 404, message: 'Pessoa palestrante não encontrada' };

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

const checkName = rescue(async (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    return next({ status: 400, message: 'O campo "name" é obrigatório' });
  }
  if (name && String(name).length < 3) {
    return next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
});

const checkAge = rescue(async (req, _res, next) => {
  const { age } = req.body;
  if (!age) {
    return next({ status: 400, message: 'O campo "age" é obrigatório' });
  }
  if (age && age < 18) {
    return next({ status: 400, message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
});

const checkIfTalk = rescue(async (req, _res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return next({
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
});

const checkTalk = rescue(async (req, _res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(watchedAt)) {
    return next({ status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return next({ status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
});

const checkTalker = [checkName, checkAge, checkIfTalk, checkTalk];

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

const updateTalker = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = { name, age, talk: { watchedAt, rate } };
  const talkerUpdated = await updateTalkerById(id, talker);
  if (talkerUpdated) {
    return res.status(200).json(talkerUpdated);
  }
  next(talkerNotFound);
});

const deleteTalker = rescue(async (req, res, next) => {
  const { id } = req.params;
  const talkerDeleted = await deleteTalkerById(id);
  if (talkerDeleted) {
    return res.status(204).json(talkerDeleted);
  }
  next(talkerNotFound);
});

const searchTalker = rescue(async (req, res, next) => {
  const { q } = req.query;
  console.log(q)
  const talker = await searchTalkerByName(q);
  if (talker.length > 0) {
    return res.status(200).json(talker);
  }
  next(talkerNotFound);
});

module.exports = {
  getTalkers,
  getTalkerById,
  insertTalker: [checkTalker, insertTalker],
  updateTalker: [checkTalker, updateTalker],
  deleteTalker,
  searchTalker,
};