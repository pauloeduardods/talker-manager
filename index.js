const express = require('express');
const bodyParser = require('body-parser');

const errorMiddleware = require('./middlewares/errorMiddleware');

const talkRouter = require('./routes/talker');
const loginRouter = require('./routes/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (_request, response) => {
//   response.status(HTTP_OK_STATUS).send();
// });

app.use('/talker', talkRouter);

app.use('/login', loginRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
