const fs = require('fs').promises;

async function getTalkers() {
  const talkerFile = await fs.readFile('./talker.json', 'utf8');
  const talkers = JSON.parse(talkerFile);
  return talkers;
}

async function getTalkerById(id) {
  const talkers = await getTalkers();
  const talkerById = talkers.find((curTalker) => Number(curTalker.id) === Number(id));
  return talkerById;
}

async function insertTalker({ name, age, talk: { watchedAt, rate } }) {
  const talkers = await getTalkers();
  const newTalker = {
    name,
    age,
    id: Number(talkers[talkers.length - 1].id) + 1,
    talk: { watchedAt, rate },
  };
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers, null, 2));
  return newTalker;
}

async function updateTalkerById(id, { name, age, talk: { watchedAt, rate } }) {
  let talker;
  const talkers = await getTalkers();
  const talkersUpdated = talkers.map((curTalker) => {
    if (Number(curTalker.id) === Number(id)) {
      talker = { ...curTalker, name, age, talk: { watchedAt, rate } };
      return {
        ...curTalker,
        name,
        age,
        talk: { watchedAt, rate },
      };
    }
    return curTalker;
  });
  await fs.writeFile('./talker.json', JSON.stringify(talkersUpdated, null, 2));
  return talker;
}

async function deleteTalkerById(id) {
  const talkers = await getTalkers();
  const talketToRemove = talkers.find((curTalker) => Number(curTalker.id) === Number(id));
  const talkersUpdated = talkers.filter((curTalker) => Number(curTalker.id) !== Number(id));
  await fs.writeFile('./talker.json', JSON.stringify(talkersUpdated, null, 2));
  return talketToRemove;
}

async function searchTalkerByName(name) {
  const talkers = await getTalkers();
  const talkerByName = talkers.filter((curTalker) => String(curTalker.name).includes(name));
  return talkerByName;
}

module.exports = {
  getTalkers,
  getTalkerById,
  insertTalker,
  updateTalkerById,
  deleteTalkerById,
  searchTalkerByName,
};