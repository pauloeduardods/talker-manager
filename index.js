const express = require('express');
const bodyParser = require('body-parser');

const errorMiddleware = require('./middlewares/errorMiddleware');

const talkRouter = require('./routes/talker');
const loginRouter = require('./routes/login');

const server = express();
const app = express.Router();
server.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '/';

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkRouter);

app.use('/login', loginRouter);

app.use(errorMiddleware);

server.use(HOST, app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
