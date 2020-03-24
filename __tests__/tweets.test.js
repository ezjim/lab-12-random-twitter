require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('did create a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        // tweetId: tweet.id,
        handle: 'testhandle',
        text: 'testtext'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: expect.any(String),
          text: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all tweets', () => {
    const tweets = [
      { handle: 'tweet 1', text: 'tweet 1' }
    ];
    return Tweet.create(tweets)
      .then(() => {
        return request(app)
          .get('/api/v1/tweets');
      })
      .then(res => {
        tweets.forEach(tweet => {
          expect(res.body).toContainEqual({
            ...tweet,
            _id: expect.any(String),
            __v: 0
          });
        });
      });
  });
});
