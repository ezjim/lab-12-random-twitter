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
  })
  
  .patch('/:id', (req, res) => {
    Tweet
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(tweet => res.send(tweet));
  })

  .delete('/:id', (req, res) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .then(tweet => res.send(tweet));
  });
  
