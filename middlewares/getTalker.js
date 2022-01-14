const fs = require('fs').promises;
const rescue = require('express-rescue');

module.exports = rescue(async (_req, res) => {
  const response = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(response);
  res.status(200).json(talker);
});
