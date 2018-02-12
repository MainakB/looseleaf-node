// routes/api1.js
// caller: server.js
// All the routes for version 1 of our api

import express from 'express';
import arrayWrap from 'arraywrap';

const api = express.Router();

api.get('/hello', (req, res) => {
  res.send({ express: 'If you are seeing this, your frontend react app is hooked up to your backend Express app. CONGRATULATIONS!' });
});

api.get('/hello/@:who', (req, res) => {
  res.send(`Hello, ${req.params.who}.`);
  // Fun fact: this has some security issues, which we’ll get to!
});
// http://localhost:3001/api/search?q=hello+world
// http://localhost:3001/api/search?q=abc+123&q=hello+world&q=xyz
// if someone gives you more queries than you expect,
// you just take the first one and ignore the rest.
api.get('/search', (req, res) => {
  const search = arrayWrap(req.query.q || '');
  const terms = search[0].split(' ');
  res.send(terms);
});

api.get('/goodbye', (req, res) => {
  res.send({ express: 'Goodbye!' });
});
api.get('/random/:min/:max', (req, res) => {
  const min = parseInt(req.params.min, 10);
  const max = parseInt(req.params.max, 10);
  if (Number.isNaN(min) || Number.isNaN(max)) {
    res.status(400);
    res.json({ error: 'Bad request.' });
    return;
  }
  const result = Math.round((Math.random() * (max - min)) + min);
  res.json({ result });
});

module.exports = api;