module.exports = (err, _req, res, _next) => {
  console.log(JSON.stringify(err, null, 2));
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Ocorreu um erro inesperado' });
};
