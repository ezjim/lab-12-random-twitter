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

  it('updates a tweets text by handle', async() => {
    const tweets = { handle: 'tweet 1', text: 'test text' };
    return Tweet.create(tweets)
      .then(tweet => {
        return request(app)
          .patch(`/api/v1/tweets/${tweet.id}`)
          .send({ text: 'test text' });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'tweet 1',
          text: 'test text',
          __v: 0
        });
      });
  });

  it('deletes a tweet by id', async() => {
    const tweets = { handle: 'tweet 1', text: 'test text' };
    return Tweet.create(tweets)
      .then(tweet => {
        return request(app)
          .delete(`/api/v1/tweets/${tweet.id}`)
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              handle: 'tweet 1',
              text: 'test text',
              __v: 0
            });
          });
      });
  });
});
