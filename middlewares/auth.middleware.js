const rescue = require('express-rescue');

const checkIfToken = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    return next();
  }
  return next({ status: 401, message: 'Token não encontrado' });
});

const checkToken = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;
  if (String(authorization).length === 16) {
    return next();
  }
  next({ status: 401, message: 'Token inválido' });
});

module.exports = { checkToken: [checkIfToken, checkToken] };