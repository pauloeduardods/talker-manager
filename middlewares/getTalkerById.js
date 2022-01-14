const fs = require('fs').promises;
const rescue = require('express-rescue');

module.exports = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(response);
  const talkerById = talker.find((curTalker) => curTalker.id === Number(id));
  if (talkerById) {
    return res.status(200).json(talkerById);
  }
  next({ status: 404, message: 'Pessoa palestrante não encontrada' });
});
