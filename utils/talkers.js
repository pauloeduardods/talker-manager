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
    id: talkers.length + 1,
    talk: { watchedAt, rate },
  };
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return newTalker;
}

module.exports = { getTalkers, getTalkerById, insertTalker };