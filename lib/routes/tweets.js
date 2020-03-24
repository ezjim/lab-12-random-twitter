const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    Tweet
      .create(req.body)
      .then(tweet => res.send(tweet));
  })

  .get('/', (req, res) => {
    Tweet
      .find()
      // .select({ notes: false })
      .then(tweets => res.send(tweets));
  });
  
