const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const connectSessionKnex = require('connect-session-knex')

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const knexSessionStore = connectSessionKnex(session)

const sessionConfig = {
  name: 'cool stuff',
  // Do not hard code in secret... This is just to save time
  secret: 'i am very tired',
  cookie: {
    maxAge: 1000 * 60 *  60,
    secure: false,
    httpOnly: true // browser cant access via js
  },
  resave: false,
  saveUninitialized: false,
  // Where do we store sessions?
  store: new knexSessionStore({
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
