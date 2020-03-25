require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Comment = require('../lib/models/Comment');
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

  it('creates a comment', () => {
    return Tweet.create({
      handle: 'jimmy',
      text: 'holyshit you got this'
    })
      .then(tweet => {
        return request(app)
          .post('/api/v1/comments')
          .send({ comment: 'sike', tweet: tweet._id });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          comment: 'sike',
          tweet: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a comment by id', () => {
    return Tweet.create({ 
      handle: 'jimmy', 
      text: 'oh sh*t son' 
    })
      .then(tweet => {
        return Comment.create({
          comment: 'wanga banga',
          tweet: tweet._id
        })
          .then(comment => {
            return request(app)
              .get(`/api/v1/comments/${comment.id}`);
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              comment: 'wanga banga',
              tweet: {
                _id: expect.any(String),
                handle: 'jimmy',
                text: 'oh sh*t son',
                __v: 0
              },
              __v: 0,
            });
          });
      });
  });


});
