const rescue = require('express-rescue');

function makeToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters[Math.floor(Math.random() * charactersLength)];
  }
  return result;
}

const checkLogin = rescue((req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/g;
  console.log(String(password).length >= 6);
  if (emailRegex.test(email) && password && String(password).length >= 6) {
    return res.status(200).send({
      token: makeToken(16),
    });
  }
  next();
});

const checkEmail = rescue((req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/g;
  if (!email) {
    return res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
});

const checkPassword = rescue((req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (String(password).length < 6) {
    return res.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next({});
});

module.exports = [checkLogin, checkEmail, checkPassword];